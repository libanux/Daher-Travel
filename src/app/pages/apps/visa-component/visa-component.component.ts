import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VisaClass, VisaType_Array, Visa_Status_Array, Visa_Status_Array_FILTERATION } from '../../../classes/visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VisaService } from 'src/app/services/visa.service';
import { GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  selector: 'app-visa-component',
  templateUrl: './visa-component.component.html',
  styleUrls: [
    '../../../../assets/scss/apps/_add_expand.scss',
    '../../../../assets/scss/apps/general_table.scss',
  ],
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

  // These two valus are used for the add expnad row in the top of the page
  panelOpenState = false;
  open_expansion_value = 0;

  // shimmer --> show shimmer until data is fetched
  show_shimmer = true;

  months: any[] = Month_Filter_Array
  Status_Array: any[] = Visa_Status_Array
  VisaType: any[] = VisaType_Array
  Status_Array_Filter: any[] = Visa_Status_Array_FILTERATION

  ShowAddButoon = true;

  // This value is used to check the size of array in current page
  // In case of deletion --> when array length becomes zero 
  // current page is current page -1 
  //  used in delete function
  current_page_array_length = 0;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;

  // These are the column of the table 
  displayedColumns: string[] = [
    'name',
    'country',
    'type',
    'sell',
    'note',
    'status',
    'createdAt',
    'action'
  ];

  // This is the added or updated VISA fdefualt values
  ADDED_VISA: VisaClass = {
    _id: -1,
    name: '',
    country: '',
    note: '',
    sell: '',
    status: 'pending',
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


  // Storing the start and end date selected in filtering by Date
  // Used in filter by date
  startDateValue: string = '';
  endDateValue: string = '';

  constructor(private breadCrumbService: BreadCrumbSignalService, private generalService: GeneralService, public dialog: MatDialog, private visaService: VisaService) {

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Visa')
    this.pageSize = this.generalService.PageSizing
    this.FETCH_VISA(this.Current_page);
  }

  showDatePicker = false;
  onChange(value: string, dropdown: string) {

    // Date filtering
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.startDateValue = '';
        this.endDateValue = '';

        this.showDatePicker = false;
        this.FILTER_ARRAY_BY_DATE(value)
      }
    }

    // Status filtering
    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FETCH_VISA(this.Current_page)
      }
      else {
        this.FILTER_ARRAY_BY_STATUS(value)
      }
    }
  }

  // open pop up to make sure user wants to delete
  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(visaDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {
        this.DELETE_VISA(obj._id);
      }
    });
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }


  // function when page number changes
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.FETCH_VISA(this.Current_page);
  }


  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')

  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')

  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
    const day = ('0' + date.getDate()).slice(-2);

    // Return the formatted date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }

  // Function to format date
  FORMAT_DATE(dateString: string): string {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC' // Optional: Adjust to your timezone
    };

    return dateObj.toLocaleString('en-US', options);
  }

  // function to make a text smaller in length 
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
  FETCH_VISA(currentPage: number) {
    this.show_shimmer = true;
    this.visaService.GET_ALL_VISA(currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        console.log(response);
        this.current_page_array_length = response.visas.length

        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      
        console.log(this.Visa_Array_length);
      },
      error: (error) => { },
      complete: () => { this.show_shimmer = false; }

    });
  }


  // DELETE 
  DELETE_VISA(ID: number): void {
    this.visaService.DELETE_VISA(ID).subscribe({
      next: (response: any) => {
        if (this.current_page_array_length == 1) {
          this.Current_page = this.Current_page - 1
        }
      },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(this.Current_page); }
    });
  }

  // ADD
  ADD_VISA(obj: VisaClass) {
    this.visaService.ADD_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.FETCH_VISA(this.Current_page); this.CANCEL_UPDATE();
      }
    });
  }

  // CONFIRM UPDATE
  UPDATE_VISA(obj: VisaClass): void {
    this.visaService.UPDATE_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(this.Current_page); this.CANCEL_UPDATE(); }
    });
  }


  // SELECT OBJECT TO UPDATE
  SELECTED_VISA(obj: any): void {
    this.ShowAddButoon = false
    this.CurrentAction = 'Update Visa';

    this.open_expansion_value = 1;
    this.panelOpenState = true;

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
    this.ShowAddButoon = true;

    this.panelClosed()

    this.ADDED_VISA = {
      _id: -1,
      name: '',
      country: '',
      note: '',
      sell: '',
      status: '',
      type: '',
      createdAt: '',
      updatedAt: '',
    }
  }

  // STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.visaService.FILTER_VISA_BY_STATUS(val, 1, this.pageSize).subscribe({
      next: (response: any) => {
        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  // DATE FILTERATION
  FILTER_ARRAY_BY_DATE(filter_type: any) {
    this.visaService.FILTER_VISA_BY_DATE(filter_type, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => { this.VisaArray = new MatTableDataSource(response.visas); },
      error: (error) => { },
      complete: () => { }
    });
  }

  // SEARCH FUNCTION
  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.visaService.FILTER_VISA_BY_SEARCH_KEY(filterValue).subscribe({
      next: (response: any) => { this.VisaArray = new MatTableDataSource(response.visas); },
      error: (error) => { this.VisaArray = new MatTableDataSource(); },
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
export class visaDialogContentComponent {
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  VISA_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<visaDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: VisaClass,
  ) {
    this.VISA_SELECTED = { ...data };
    this.action = this.VISA_SELECTED.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.VISA_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
