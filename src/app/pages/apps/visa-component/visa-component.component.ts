import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VisaClass, VisaType_Array, Visa_Status_Array, Visa_Status_Array_FILTERATION } from '../../../classes/visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VisaService } from 'src/app/services/visa.service';
import { Download_Options, GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { CustomerService } from 'src/app/services/Customer.service';
import { CustomerClass } from 'src/app/classes/customer.class';

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
  Options: any[] = Download_Options;

  ShowAddButoon = true;


  NEW_CUSTOMER_ADDED: CustomerClass[] = []
  // This value is used to check the size of array in current page
  // In case of deletion --> when array length becomes zero 
  // current page is current page -1 
  //  used in delete function
  current_page_array_length = 0;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  // searchText: any;

  // These are the column of the table 
  displayedColumns: string[] = [
    'Customer',
    'phoneNumber',
    'country',
    'type',
    'sell',
    'note',
    'status',
    'action'
  ];

  // This is the added or updated VISA fdefualt values
  ADDED_VISA: VisaClass = new VisaClass()
  MAIN_SELECTED_VISA_DATA: VisaClass = new VisaClass()

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

  SHOW_LOADING_SPINNER: boolean = false;

  // Storing the start and end date selected in filtering by Date
  // Used in filter by date

  constructor(
    private customerService: CustomerService,
    private routeSignalService: RouteSignalService,
    private breadCrumbService: BreadCrumbSignalService,
    private generalService: GeneralService, 
    public dialog: MatDialog, private visaService: VisaService) {

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Visa')
    this.pageSize = this.generalService.PageSizing
    this.FETCH_VISA();
  }

  selectedDownloadOption: string = 'Download as';

  DOWNLOAD(OPTION: string) {
    console.log(OPTION)
    // return this.selectedDownloadOption = OPTION

    // this.visaService.DOWNLOAD_AS(OPTION).subscribe({
    //   next: (response: any) => {
    //    console.log(response)
    //   },
    //   error: (error) => { console.error('Download error:', error);      },
    //   complete: () => { console.log('Download process complete')      }
    // });

    this.visaService.getData()

  }


  // FILTERING BY DROPDOWN SELECTION : DATE OR STATUS
  showDatePicker = false;
  DROPDOWN_FILTERATION(value: string, dropdown: string) {

    // Date filtering
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.START_DATE = '';
        this.END_DATE = '';

        this.showDatePicker = false;
        this.FILTER_ARRAY_BY_DATE(value)
      }
    }

    // Status filtering
    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FILTER_ARRAY_BY_STATUS('')
      }
      else {
        this.FILTER_ARRAY_BY_STATUS(value)
      }
    }

    else if (dropdown == 'Download') {
      this.DOWNLOAD(value);
    }
  }

  // OPEN DIALOG TO MAKE SURE OF DELETION
  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(visaDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {
        this.DELETE_VISA(obj._id);
      }

      else if (result.event === 'Add New Customer') {
        this.ADD_NEW_CUSTOMER(result.data);
        this.CUSTOMER_SELECTED = result.data.name
      }
    });
  }

  // Method to handle the panel closed event
  CLOSE_PANEL() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  OPEN_PANEL() {
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }

  // function when page number changes
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.FETCH_VISA();
  }

  isAnyFieldNotEmpty = false; // Flag to track if any field has content
  // Function to log input changes
  onInputChange() {

    // When inputs changes -> i check if they are the same as the main one
    // if they are the same keep the update button disabled
    if (JSON.stringify(this.MAIN_SELECTED_VISA_DATA) !== JSON.stringify(this.ADDED_VISA)) {
      this.DATA_CHANGED = true;
    } 
    else {
      this.DATA_CHANGED = false;
    }
    
    // Check only specific fields for content
    this.isAnyFieldNotEmpty = ['name', 'country', 'note', 'sell'].some(key => {
      const fieldValue = this.ADDED_VISA[key as keyof VisaClass] || ''; // Using || for fallback value
      return fieldValue !== '' && fieldValue !== null;
    });

    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);
    }
  }

  CUSTOMER_SELECTED: CustomerClass = new CustomerClass();
  filteredCustomers: any[] = []
  filterCustomers() {
    const query = this.CUSTOMER_SELECTED.name.toLowerCase();
    this.filteredCustomers = this.ALL_CUSTOMERS_ARRAY.filter((customer: any) =>
      customer.name.toLowerCase().includes(query)
    );
  }

  ALL_CUSTOMERS_ARRAY: any = []
  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.customerService.GET_ALL_CUSTOMERS_WITH_NO_PAGING().subscribe({
      next: (response: any) => {
        this.ALL_CUSTOMERS_ARRAY = response.customers;
        this.filteredCustomers = response.customers;
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  onCustomerSelected(event: any) {
    console.log('event ', event);

    this.CUSTOMER_SELECTED.name = event.option.value;

    if (this.MAIN_SELECTED_VISA_DATA.customer.name !== this.CUSTOMER_SELECTED.name ) {
      this.DATA_CHANGED = true;
      console.log('changed');
    } 
    else {
      this.DATA_CHANGED = false;
      console.log('same')

    }
  }

  ADD_NEW_CUSTOMER(obj: CustomerClass) {
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => {
        this.ADDED_VISA.customer.id = response._id
        this.ADDED_VISA.customer.name = response.name
        this.ADDED_VISA.customer.phoneNumber = response.phoneNumber;

        this.CUSTOMER_SELECTED = response.name;

      },
      error: (error) => { },
      complete: () => {
        this.FETCH_CUSTOMER();
      }
    });
  }

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.START_DATE = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')
  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.END_DATE = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')
  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    return this.generalService.FORMAT_DATE_YYYYMMDD(date)
  }

  // Function to format date
  FORMAT_DATE(dateString: string): string {
    return this.generalService.FORMAT_DATE_WITH_HOUR(dateString)
  }

  // function to make a text smaller in length 
  truncateText(text: string, limit: number): string {
    return this.generalService.truncateText(text, limit)
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
    return this.generalService.GET_STATUS_CLASS(status, 'pending', 'approved', 'rejected')
  }

  // ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE, SEARCH

  // GET ALL VISA'S 
  FETCH_VISA() {
    this.show_shimmer = true;
    this.visaService.GET_ALL_VISA(this.Current_page, this.pageSize).subscribe({
      next: (response: any) => {
        this.current_page_array_length = response.visas.length
        this.VisaArray = new MatTableDataSource(response.visas);
        // LENGTH : FOR PAGINATION 
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { },
      complete: () => {
        this.show_shimmer = false;
        this.FETCH_CUSTOMER()
      }
    });
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.CurrentAction = 'Add Visa';
    this.ShowAddButoon = true;
    this.routeSignalService.show_pop_up_route.set(false)
    this.SHOW_LOADING_SPINNER = false
    this.DATA_CHANGED = false;
    this.CUSTOMER_SELECTED = new CustomerClass();

    // CLOSE THE PANEL
    this.CLOSE_PANEL()

    this.ADDED_VISA = {
      _id: '',
      customer: {
        id: '',
        name: '',
        phoneNumber: '',
      },
      country: '',
      note: '',
      sell: '',
      status: '',
      type: '',
    }


  }

  // DELETE VSIA
  DELETE_VISA(ID: number): void {
    this.visaService.DELETE_VISA(ID).subscribe({
      next: (response: any) => {
        if (this.current_page_array_length == 1) {
          this.Current_page = this.Current_page - 1
        }
      },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(); this.CANCEL_UPDATE();}
    });
  }

  // ADD NEW VISA
  ADD_VISA(obj: VisaClass) {
    console.log(obj)
    this.SHOW_LOADING_SPINNER = true
    this.visaService.ADD_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.FETCH_VISA(); this.CANCEL_UPDATE();
      }
    });
  }

  DATA_CHANGED: boolean = false;
  // CONFIRM UPDATE
  UPDATE_VISA() {
    this.SHOW_LOADING_SPINNER = true
    this.visaService.UPDATE_VISA(this.ADDED_VISA).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(); this.CANCEL_UPDATE(); }
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_VISA(obj: VisaClass): void {

    this.CUSTOMER_SELECTED = new CustomerClass ();

    // SECURE THE ROUTE
    this.routeSignalService.show_pop_up_route.set(false)
    // HIDE ADD BUTTON AND SHOW THE UPDATE BUTTON
    this.ShowAddButoon = false
    this.CurrentAction = 'Update Visa';
    // OPEN THE PANEL 
    this.OPEN_PANEL();
    // FILL THE INPUTS WITH THE SELECTED OBJ VALUES
    this.ADDED_VISA = { ...obj };
    this.MAIN_SELECTED_VISA_DATA = obj ;
    this.CUSTOMER_SELECTED.name = this.ADDED_VISA.customer.name;
  }

  // STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.STATUS = val
    this.FILTER_VISAS(this.SEARCK_KEY, this.FILTER_TYPE, this.START_DATE, this.END_DATE, val)
  }

  // DATE FILTERATION
  FILTER_ARRAY_BY_DATE(filter_type: any) {
    this.FILTER_TYPE = filter_type
    this.FILTER_VISAS(this.SEARCK_KEY, filter_type, this.START_DATE, this.END_DATE, this.STATUS)
  }

  // FILTER BY SEARCH KEY
  APPLY_SEARCH_FILTER(searchValue: string): void {
    this.Current_page = 1
    this.SEARCK_KEY = searchValue
    this.FILTER_VISAS(searchValue, this.FILTER_TYPE, this.START_DATE, this.END_DATE, this.STATUS)
  }

  SEARCK_KEY = '';
  FILTER_TYPE = ''
  START_DATE = ''
  END_DATE = ''
  STATUS = ''
  FILTER_VISAS(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string) {
    this.visaService.FILTER_AND_SEARCH_VISAS(SEARCK_KEY, FILTER_TYPE, START_DATE, END_DATE, STATUS, this.Current_page, this.pageSize).subscribe({
      next: (response: any) => {
        this.current_page_array_length = response.visas.length
        this.VisaArray = new MatTableDataSource(response.visas);
        // LENGTH : FOR PAGINATION 
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { this.VisaArray = new MatTableDataSource() },
      complete: () => { }
    });
  }

}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './visa-dialog-content/visa-dialog-content.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class visaDialogContentComponent {

  action: string;
  action_btn: string = 'Add'
  SHOW_LOADING_SPINNER: boolean = false;

  VISA_SELECTED: any;
  NEW_CUSTOMER: CustomerClass = new CustomerClass();

  constructor(
    public dialogRef: MatDialogRef<visaDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.VISA_SELECTED = { ...data };
    this.action = data.action;

    if (this.action == 'Add New Customer') {
      this.action_btn = 'Add Customer'
    }
  }

  doAction(): void {
    this.SHOW_LOADING_SPINNER = true

    if (this.action == 'Add New Customer') {
      this.dialogRef.close({ event: this.action, data: this.NEW_CUSTOMER });
    }

    else {
      this.dialogRef.close({ event: this.action, data: this.VISA_SELECTED });

    }
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
