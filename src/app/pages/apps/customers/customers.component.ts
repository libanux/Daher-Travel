import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { CustomerService } from 'src/app/services/Customer.service';
import { CustomerClass } from 'src/app/classes/customer.class';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
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
export class CustomersComponent implements OnInit {

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
    'firstname',
    'lastname',
    'email',
    'phone',
    'token'
  ];

  ADDED_CUSTOMER: CustomerClass = {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    token: '',
  }

  // CustomersArray : CUSTOMERClass [] = []

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: CustomerClass | null = null;
  CustomersArray = new MatTableDataSource();
  valueDisplayed = ''

  constructor(public dialog: MatDialog, private dateSignal: DateSelectedSignal, private customerService: CustomerService) {
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    )
    )
  }

  ngOnInit(): void {
    this.rangeEnd = this.dateSignal.endDate;
    this.rangeStart = this.dateSignal.startDate;
    this.FETCH_CUSTOMER();
  }

  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.customerService.GET_ALL_CUSTOMER().subscribe({

      next: (response: any) => {
        this.totalCount = response.length;

        // Calculate status counts without filtering the array
        this.Completed = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'approved').length;
        this.Cancelled = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'rejected').length;
        this.Inprogress = response.filter((visa: any) => visa.status.trim().toLowerCase() === 'pending').length;

        this.CustomersArray = new MatTableDataSource(response);
      },
      error: (error) => { },
      complete: () => {}

    });
  }

  // onChange(value: string) {
  //   if (value === 'Calendar') {
  //     this.openCalendarDialog();
  //   }

  //   else {

  //   }
  // }

  // openCalendarDialog(): void {
  //   // const dialogRef = this.dialog.open(CalendarDialogComponent, {
  //   //   width: '350px',
  //   //   data: { selectedDate: this.selectedDate }
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log('The dialog was closed', result);
  //   //   if (result) {
  //   //     if (result.startDate && result.endDate) {
  //   //       this.selectedMonth = `${result.startDate.toLocaleString('default', { month: 'long' })} - ${result.endDate.toLocaleString('default', { month: 'long' })}`;
  //   //     } else {
  //   //       this.selectedMonth = 'Custom';
  //   //     }
  //   //     this.selectedDate = result;
  //   //     // Do something with the selected date
  //   //   }
  //   // });
  // }

  // showCalendar: boolean = false;
  // selectedMonth: string = '';
  // selectedDate: Date | null = null; // Adjusted the type to accept null

  // onDateSelect(date: Date) {
  //   console.log('Selected Date:', date);
  //   // Do something with the selected date
  // }

  // cancelSelection() {
  //     this.showCalendar = false;
  //     this.selectedMonth = '';
  //     this.selectedDate = null;
  // }

  ngAfterViewInit(): void {
    this.CustomersArray.paginator = this.paginator;
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.CustomersArray.filter = filterValue.trim().toLowerCase();
  }

  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.CustomersArray.filter = val.trim().toLowerCase();
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
  DELETE_CUSTOMER(ID: number): void {
    this.customerService.DELETE_CUSTOMER(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_CUSTOMER(); }
    });
  }

  // ADD
  ADD_CUSTOMER(obj: CustomerClass) {
    console.log(obj)
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.CANCEL_UPDATE();
        this.FETCH_CUSTOMER();
      }
    });
  }

  // CONFIRM UPDATE
  UPDATE_CUSTOMER(obj: CustomerClass): void {
    this.customerService.UPDATE_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.CANCEL_UPDATE();
        this.FETCH_CUSTOMER();
      }
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_CUSTOMER(obj: any): void {
    this.ShowAddButoon = false

    this.ADDED_CUSTOMER = {
      _id: obj._id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      phone: obj.phone,
      token: obj.token
    }

  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true
    this.ADDED_CUSTOMER = {
      _id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      token: '',
    }
  }

}