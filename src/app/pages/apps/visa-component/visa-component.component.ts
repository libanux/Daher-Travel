import { Component, Inject, Input, OnInit, Optional, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VisaClass } from './visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { VisaService } from 'src/app/services/visa.service';
import { GeneralService } from 'src/app/services/general.service';
import { PagingService } from 'src/app/signals/paging.service';

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

  @Input() showAddSection = true;

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
    updatedAt: ''
  }

  pageSize = 10;
  Visa_Array_length = 0
  Current_page = 1


  showCalendar: boolean = false;
  selectedMonth: string = '';
  selectedStatusFilteraTION: string = '';
  selectedDate: Date | null = null; // Adjusted the type to accept null

  CurrentAction = 'Add Visa'
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: VisaClass | null = null;
  VisaArray = new MatTableDataSource();
  valueDisplayed = ''

  constructor( private paginagservice: PagingService, private generalService: GeneralService, public dialog: MatDialog, private dateSignal: DateSelectedSignal, private visaService: VisaService) {
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    )
    )
  }

   // 1 basic
   panelOpenState = false;
   open_expansion_value = 0;

  ngOnInit(): void {
    this.rangeEnd = this.dateSignal.endDate;
    this.rangeStart = this.dateSignal.startDate;
    this.pageSize = this.generalService.PageSizing
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

  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(visaDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {       
        console.log(obj)
        this.DELETE_VISA(obj._id);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    console.log('page is changes')
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.paginagservice.pageSize.set(event.pageSize);
    this.paginagservice.currentPage.set(event.pageIndex);
    
    console.log('event : ', event)
    console.log('current page : ', this.Current_page)

    if((event.length - (event.pageIndex*10)) < 10){
      this.pageSize = (event.length - (event.pageIndex*10))
      console.log('current page SIZE : ', this.pageSize);
      this.FETCH_VISA();
    }
    else{
      console.log('current page SIZE : 10 , ', this.pageSize);
      this.FETCH_VISA();
    }
    
  }

  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
    // Do something with the selected date
  }

  // ngAfterViewInit(): void {
  //   this.VisaArray.paginator = this.paginator;
  // }

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
    this.visaService.GET_ALL_VISA(this.Current_page).subscribe({
      next: (response: any) => {
        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { },
      complete: () => {this.CANCEL_UPDATE();}

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
      complete: () => {this.FETCH_VISA();}
    });
  }

  // CONFIRM UPDATE
  UPDATE_VISA(obj: VisaClass): void {
    this.visaService.UPDATE_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {this.FETCH_VISA();}
    });
  }


  // SELECT OBJECT TO UPDATE
  SELECTED_VISA(obj: any): void {
    this.ShowAddButoon = false
    this.CurrentAction = 'Update Visa'
    
    this.open_expansion_value = 1 ;

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
    this.CurrentAction = 'Add Visa';
    this.open_expansion_value = -1 ;
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
    this.visaService.FILTER_VISA_BY_STATUS(val, this.Current_page, this.pageSize).subscribe({
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
    }); 
  }

}








@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './visa-dialog-content/visa-dialog-content.component.html',
  styleUrl: './visa-dialog-content/visa-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class visaDialogContentComponent{
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  VISA_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<visaDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: VisaClass,
  ) 
  {
    this.VISA_SELECTED = { ...data };
    this.action = this.VISA_SELECTED.action;
    console.log(this.VISA_SELECTED)
  }

  doAction(): void {
    console.log(this.VISA_SELECTED)
    this.dialogRef.close({ event: this.action, data: this.VISA_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
