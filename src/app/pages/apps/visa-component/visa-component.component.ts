import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { VisaClass } from './visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { CalendarDialogComponent } from './calendar-card/calendar-dialog.component';
import { id } from 'date-fns/locale';
import { VisaService } from 'src/app/services/visa.service';


@Component({
  selector: 'app-visa-component',
  templateUrl: './visa-component.component.html',
  styleUrl: './visa-component.component.scss',
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

export class VisaComponentComponent implements OnInit {

  months: month[] = [
    { value: 'today', viewValue: 'Today' },
    { value: 'yesterday', viewValue: 'Yesterday' },
    { value: 'thisWeek', viewValue: 'This Week' },
    { value: 'thisMonth', viewValue: 'This Month' },
    { value: 'thisYear', viewValue: 'This Year' },
    { value: 'Calendar', viewValue: 'Custom' }
  ];

  Filteration: month[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'rejected', viewValue: 'Rejected' },
    { value: 'approved', viewValue: 'Approved' },
    { value: 'pending', viewValue: 'Pending' },
  ];

  rangeStart = signal('');
  rangeEnd = signal('');
  ShowAddButoon = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;

  displayedColumns: string[] = [
    'name',
    'updatedAt',
    'sell',
    'createdAt',
    'country',
    'type',
    'note',
    'status',
    'action'
  ];

  ADDED_VISA: VisaClass = {
    _id: -1,
    name: '',
    country: '',
    note: '',
    sell: 0,
    status: '',
    type: '',
    createdAt: '',
    updatedAt: '',

  }

  showCalendar: boolean = false;
  selectedMonth: string = '';
  selectedStatusFilteraTION: string = '';
  selectedDate: Date | null = null; // Adjusted the type to accept null

  CurrentAction = 'Add Visa'
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

  showDatePicker = false;
  onChange(value: string, dropdown: string) {

    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_ARRAY_BY_DATE(value)
      }
    }

    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FETCH_VISA()
      }
      else {
        this.FILTER_ARRAY_BY_STATUS(value)
      }
    }
  }

  openCalendarDialog(): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      width: '350px',
      data: { selectedDate: this.selectedDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.startDate && result.endDate) {
          this.selectedMonth = `${result.startDate.toLocaleString('default', { month: 'long' })} - ${result.endDate.toLocaleString('default', { month: 'long' })}`;
        } else {
          this.selectedMonth = 'Custom';
        }
        this.selectedDate = result;
        // Do something with the selected date
      }
    });
  }

  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
    // Do something with the selected date
  }

  ngAfterViewInit(): void {
    this.VisaArray.paginator = this.paginator;
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


  // ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE, SEARCH

  // GET ALL VISA'S 
  FETCH_VISA() {
    this.visaService.GET_ALL_VISA().subscribe({
      next: (response: any) => {
        console.log(response)
        this.VisaArray = new MatTableDataSource(response.visas);
      },
      error: (error) => { },
      complete: () => { }

    });
  }

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
    this.CurrentAction = 'Update Visa'

    this.ADDED_VISA = {
      _id: obj._id,
      name: obj.name,
      country: obj.country,
      note: obj.note,
      sell: obj.sell,
      status: obj.status,
      type: obj.type,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    }

  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.CurrentAction = 'Add Visa'
    this.ShowAddButoon = true
    this.ADDED_VISA = {
      _id: -1,
      name: '',
      country: '',
      note: '',
      sell: 0,
      status: '',
      type: '',
      createdAt: '',
      updatedAt: '',
    }
  }

  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.visaService.FILTER_VISA_BY_STATUS(val).subscribe({
      next: (response: any) => { this.VisaArray = new MatTableDataSource(response.visas); },
      error: (error) => { },
      complete: () => { }
    });
  }

  //DATE FILTERATION
  FILTER_ARRAY_BY_DATE(filter_type: any) {
    this.visaService.FILTER_VISA_BY_DATE(filter_type).subscribe({
      next: (response: any) => { this.VisaArray = new MatTableDataSource(response.visas); },
      error: (error) => { },
      complete: () => { }
    });
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.visaService.FILTER_VISA_BY_SEARCH_KEY(filterValue).subscribe({
      next: (response: any) => { this.VisaArray = new MatTableDataSource(response.visas); },
      error: (error) => { },
      complete: () => { }
    });    console.log(filterValue)
  }

}