import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { id } from 'date-fns/locale';
import { VisaService } from 'src/app/services/visa.service';
import { VisaClass } from '../visa-component/visaClass';

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler.component.html',
  styleUrl: './wholesaler.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class WholesalerComponent implements OnInit {

  months: month[] = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'Last Month', viewValue: 'Last Month' },
    { value: 'Last Year', viewValue: 'Last Year' },
    { value: 'Calendar', viewValue: 'Custom' }
  ];

  rangeStart = signal('');
  rangeEnd = signal('');
  ShowAddButoon = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  displayedColumns: string[] = [
    'name',
    'destination',
    'updatedAt',
    'sell',
    'createdAt',
    'country',
    'price',
    'type',
    'note',
    'status',
    'action'
  ];

  // ADDED_VISA: VisaClass = {
    // _id: -1,
    // name: '',
    // country: '',
    // destination: '',
    // sell: 0,
    // type: '',
    // price: 0,
    // note: '',
    // status: '',
  // }

  // VisaArray : VisaClass [] = []

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: VisaClass | null = null;
  VisaArray = new MatTableDataSource();
  valueDisplayed = ''

  constructor(public dialog: MatDialog, private dateSignal: DateSelectedSignal, private visaService: VisaService) {
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    )
    )
  }

  ngOnInit(): void {
    this.rangeEnd = this.dateSignal.endDate;
    this.rangeStart = this.dateSignal.startDate;
    this.FETCH_VISA();
  }

  // GET ALL VISA'S 
  FETCH_VISA() {
    this.visaService.GET_ALL_VISA().subscribe({

      next: (response: any) => {
        this.totalCount = response.length;

        // Calculate status counts without filtering the array
        this.Completed = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'approved').length;
        this.Cancelled = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'rejected').length;
        this.Inprogress = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'pending').length;

        this.VisaArray = new MatTableDataSource(response);
      },
      error: (error) => { },
      complete: () => {}

    });
  }

  onChange(value: string) {
    if (value === 'Calendar') {
      this.openCalendarDialog();
    }

    else {

    }
  }

  openCalendarDialog(): void {
    // const dialogRef = this.dialog.open(CalendarDialogComponent, {
    //   width: '350px',
    //   data: { selectedDate: this.selectedDate }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   if (result) {
    //     if (result.startDate && result.endDate) {
    //       this.selectedMonth = `${result.startDate.toLocaleString('default', { month: 'long' })} - ${result.endDate.toLocaleString('default', { month: 'long' })}`;
    //     } else {
    //       this.selectedMonth = 'Custom';
    //     }
    //     this.selectedDate = result;
    //     // Do something with the selected date
    //   }
    // });
  }

  showCalendar: boolean = false;
  selectedMonth: string = '';
  selectedDate: Date | null = null; // Adjusted the type to accept null

  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
    // Do something with the selected date
  }

  // cancelSelection() {
  //     this.showCalendar = false;
  //     this.selectedMonth = '';
  //     this.selectedDate = null;
  // }

  ngAfterViewInit(): void {
    this.VisaArray.paginator = this.paginator;
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.VisaArray.filter = filterValue.trim().toLowerCase();
  }

  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.VisaArray.filter = val.trim().toLowerCase();
  }

  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  EXPAND_ROW(event: Event, element: any, column: string): void {
    if (column === 'action') {
      this.expandedElement = element;
    }

    else {
      this.expandedElement = this.expandedElement === element ? null : element;
      event.stopPropagation();
    }
  }

  //GET THE STATUS CLASS
  GET_STATUS_CLASS(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'approved':
        return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'rejected':
        return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      default:
        return '';
    }
  }

  // ACTION BUTTONS : ADD , UPDATE , CANCEL , DELETE 

  // DELETE 
  DELETE_VISA(ID: number): void {
    this.visaService.DELETE_VISA(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(); }
    });
  }

  // ADD
  ADD_VISA(obj: VisaClass) {
    console.log(obj)
    this.visaService.ADD_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.CANCEL_UPDATE();
        this.FETCH_VISA();
      }
    });
  }

  // CONFIRM UPDATE
  UPDATE_VISA(obj: VisaClass): void {
    this.visaService.UPDATE_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.CANCEL_UPDATE();
        this.FETCH_VISA();
      }
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_VISA(obj: any): void {
    this.ShowAddButoon = false

    // this.ADDED_VISA = {
    //   _id: obj._id,
    //   name: obj.name,
    //   country: obj.country,
    //   destination: obj.destination,
    //   sell: obj.sell,
    //   type: obj.type,
    //   price: obj.price,
    //   note: obj.note,
    //   status: obj.status,
    // }

  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true
    // this.ADDED_VISA = {
      // _id: -1,
      // name: '',
      // country: '',
      // // destination: '',
      // sell: 0,
      // type: '',
      // price: 0,
      // note: '',
      // status: '',
    // }
  }

}
