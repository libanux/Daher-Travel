import { ChangeDetectorRef, Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketingService } from 'src/app/services/ticketing.service';
import { Download_Options, GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { Tickets } from 'src/app/classes/tickets.class';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { CustomerService } from 'src/app/services/Customer.service';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CustomerClass } from 'src/app/classes/customer.class';
import { Package } from 'src/app/classes/package.class';
import { Visa_Status_Array } from 'src/app/classes/visaClass';
import { AdminService } from 'src/app/services/Admins.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['../../../../assets/scss/apps/_add_expand.scss', '../../../../assets/scss/apps/general_table.scss'],
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
export class TicketsComponent {
  ShowAddButoon = true;
  selectedMonth: string = '';
  @Input() showAddSection = true;

  //MAIN TICKETS ARRAY
  tickets: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;
  startDateValue: string = '';
  endDateValue: string = '';
  show_shimmer = true
  currentAction: string = 'Add Ticket';
  showDatePicker: boolean = false;
  pageSize = 10;
  currentPage = 1;
  filteredCustomers: any[] = []
  ROWS_COUNT_SHIMMER: any[] = ['1', '2', '3', '4'];
  ADDED_WHOLESALER: WholesalerClass = new WholesalerClass()
  choosenWholesaler: WholesalerClass
  NEW_CUSTOMER_ADDED: CustomerClass[] = []
  NEW_WHOLESALER_ADDED: WholesalerClass[] = []
  CUSTOMER_SELECTED = { id: '', name: '' }
  WHOLESALER_SELECTED = { id: '', name: '' }
  DATA_CHANGED: boolean = false;
  SHOW_LOADING_SPINNER: boolean = false;
  //TABLE COLUMNS
  displayedColumns: string[] = ['name', 'source', 'destination', 'cost', 'credit', 'balance', 'note', 'action',];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Tickets | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText:string ='';
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  // These two valus are used for the add expnad row in the top of the page
  panelOpenState = false;
  open_expansion_value = 0;
  allWholesalers: any[] = []
  filteredWholeSalers: any[] = []
  allCustomers: any = []

  //MONTHS FOR FILTER DROPDOWN
  months: any[] = Month_Filter_Array
  //TICKETS
  dataSource = new MatTableDataSource(this.tickets);
  //TICKET ON EDIT
  ADDED_TICKET: Tickets = {
    _id: '',
    name: '',
    wholesaler: {
      id: '',
      name: ''
    },
    source: '',
    destination: '',
    balance: '',
    cost: '',
    credit: '',
    note: '',
    seats: '',
    status: 'rejected'
  }

  Status_Array: any[] = Visa_Status_Array


  searchQuery: string;
  searchQuery1: string = ''
  selectedDownloadOption: string = 'Download'
  Options: any[] = Download_Options;

  constructor(    private adminService: AdminService,
    private cdr: ChangeDetectorRef, private wholesaler: WholesalerService, private customerService: CustomerService, private routeSignalService: RouteSignalService, public generalService: GeneralService, public dialog: MatDialog, private ticketingService: TicketingService, private breadCrumbService: BreadCrumbSignalService) {
  }


  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Ticketing')
    this.FETCH_TICKETINGS();
    this.adminID = localStorage.getItem('admin_id') || '';
    this.GET_ADMIN_PERMISSIONS_FOR_VISA();
  }

  showToggle = true;
  ADMIN_LOGGED_IN_PERMISSION: string
  adminID: string 
  // GET ADMIN BY ID FUNCTION --> TO CHECK PERMISSIONS
  GET_ADMIN_PERMISSIONS_FOR_VISA() {
    this.adminService.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => {
         this.ADMIN_LOGGED_IN_PERMISSION = response.permissions.ticketing; 
         console.log(this.ADMIN_LOGGED_IN_PERMISSION) 
        },
      error: (error: any) => { },
      complete: () => {
    if(this.ADMIN_LOGGED_IN_PERMISSION=='readwrite' || this.ADMIN_LOGGED_IN_PERMISSION=='read'){
      this.FETCH_TICKETINGS();
      console.log('here')
      this.showToggle = false;

    }

    else {
      this.showToggle = true;

    }
    }
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  //FETCH TICKETINGS FROM API
  FETCH_TICKETINGS(): void {
    this.ticketingService.GET_TICKETINGS(this.pageSize, this.currentPage).subscribe({
      next: (response: any) => {
        this.show_shimmer = false;
        this.tickets = response.ticketings
        this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTicketings
      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
        this.FETCH_CUSTOMER()
        this.FETCH_WHOLESALERS()
      }
    });
  }


  OPEN_DIALOG(action: string, obj: any): void {
    const dialogRef = this.dialog.open(AppTicketingDialogContentComponent, {
      data: { action, obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add New Wholesaler') {

        this.ADD_WHOLESALER(result.data);
        this.ADDED_TICKET.wholesaler.id = result.data._id;
        this.ADDED_TICKET.wholesaler.name = result.data.name;

      } else if (result.event === 'Delete') {

        this.DELETE_TICKETING(obj);

      } else if (result.event === 'Add New Customer') {

        this.ADD_NEW_CUSTOMER(result.data);
        this.ADDED_TICKET.name = result.data.name;

      }
    });
  }
  // THIS FUNCTION IS FOR THE PAGING TO GO TO PREVOIUS PAGE
  goToPreviousPage(): void {
    if (this.paginator && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  ADD_NEW_CUSTOMER(obj: CustomerClass) {
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => {
        this.CUSTOMER_SELECTED.id = obj._id
        this.CUSTOMER_SELECTED.name = obj.name
        this.CUSTOMER_SELECTED.name = response.name
        this.ADDED_TICKET.name = response.name;
      },
      error: (error) => { },
      complete: () => {
        this.FETCH_CUSTOMER();
      }
    });
  }

  //ADD NEW WHOLESALER
  ADD_WHOLESALER(wholesaler: any) {
    this.wholesaler.ADD_WHOLESALER(wholesaler).subscribe({
      next: (response: any) => {
        this.WHOLESALER_SELECTED.id = response._id;
        this.WHOLESALER_SELECTED.name = response.name;
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.FETCH_WHOLESALERS()
      }
    });
  }

  //DELETE TICKETING RECORD
  DELETE_TICKETING(ticket: any) {
    this.show_shimmer = true;
    this.ticketingService.DELETE_TICKETING(ticket).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS()
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.goToPreviousPage()
       }
    });
  }

  // GET ALL WHOLESALERS
  FETCH_WHOLESALERS() {

    this.wholesaler.GET_ALL_WHOLESALERS(1).subscribe({
      next: (response: any) => {
        this.allWholesalers = response.wholesalers
        this.filteredWholeSalers = response.wholesalers;
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.customerService.GET_ALL_CUSTOMERS_WITH_NO_PAGING().subscribe({
      next: (response: any) => {
        this.allCustomers = response.customers;
        this.filteredCustomers = response.customers;
      },
      error: (error) => { },
      complete: () => {
        this.FETCH_WHOLESALERS()
      }
    });
  }

  filterCustomers() {
    const query = this.ADDED_TICKET.name.toLowerCase();
    this.filteredCustomers = this.allCustomers.filter((supplier: { name: string; }) => supplier.name.toLowerCase().includes(query));
  }

  filterWholesalers() {
    const query = this.ADDED_TICKET.wholesaler.name.toLowerCase();
    this.filteredWholeSalers = this.allWholesalers.filter(supplier => supplier.name.toLowerCase().includes(query));
  }

  displayFn(product: { id: number, name: string }): string {
    return product ? product.name : '';
  }

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    console.log("Start date:",this.startDateValue)
  }
  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    console.log("End date:",this.endDateValue)
    this.SEARCH_TICKETS()
  }
  FORMAT_DATE_YYYYMMDD(date: Date): string {
    if (!date) {
      return ''; // or handle the case where date is null or undefined
    }
    
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    
    return `${year}-${month}-${day}`;
  }
  
  // Function to format date
  FORMAT_DATE(dateString: string): string {
    return this.generalService.FORMAT_DATE_WITH_HOUR(dateString)
  };


  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.selectedMonth='custom'
        this.showDatePicker = true;
      }
      else {
        this.showDatePicker = false;
        this.selectedMonth = value;
        this.SEARCH_TICKETS()
      }
    }
    else if (dropdown == 'Download') {
      this.DOWNLOAD(value);
    }
  }


  DOWNLOAD(OPTION: string) {
    this.generalService.getData('EXPORT_TICKETING_TO_EXCEL')

  }

  //FILTER PACKAGES BY DATE
  FILTER_TICKETS_BY_DATE(filter: string) {
    this.ticketingService.FILTER_TICKETS_BY_DATE(filter, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.tickets = response;
        this.dataSource = new MatTableDataSource(this.tickets);
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }

  //PAGING DETECT
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.FETCH_TICKETINGS()
  }

  //ADD NEW TICKET
  ADD_TICKETINGS(): void {
    this.SHOW_LOADING_SPINNER = true;
    this.ADDED_TICKET.wholesaler.id = this.WHOLESALER_SELECTED.id
    this.ticketingService.ADD_TICKETING(this.ADDED_TICKET).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.ADDED_TICKET);
        this.FETCH_TICKETINGS();
      },
      error: (error: any) => {
        console.error("Error:", error);
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;
        this.open_expansion_value = -1;
      }
    });
  }


  //FETCH TICKETS FROM API
  SEARCH_TICKETS(): void {
    this.paginator.firstPage();
    this.ticketingService.SEARCH_FILTER_TICKETS(this.pageSize, this.currentPage, this.searchText, this.selectedMonth, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.tickets = response.ticketings;
        // this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTickets
        console.log("Response data",response)
      },
      error: (error: any) => {
        this.tickets = []
        this.totalCount = 0;
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  expandRow(event: Event, element: any, column: string): void {
    if (column === 'action') {
      this.expandedElement = element;
    }
    else {
      this.expandedElement = this.expandedElement === element ? null : element;
      event.stopPropagation();
    }
  }

  //TRUNCATE THE TEXT INTO 20 CHARS
  truncateText(text: string, limit: number): string {
    return this.generalService.truncateText(text, limit)
  }


  //CANCEL UPDATE 
  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.open_expansion_value = -1;
    this.CLEAR_VALUES(this.ADDED_TICKET);
    this.currentAction = 'Add Ticket';
    this.routeSignalService.show_pop_up_route.set(false);
    this.CUSTOMER_SELECTED = { id: '', name: '' };

  }


  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  //GET CHOOSEN WHOLESALER OF CUSTOMER
  onOptionSelected(event: MatAutocompleteSelectedEvent, source: string) {
    if (source == 'customer') {
      this.ADDED_TICKET.name = event.option.value.name
    } else {
      this.choosenWholesaler = event.option.value;
      this.ADDED_TICKET.wholesaler.id = event.option.value._id;
      // this.ADDED_TICKET.wholesaler.name = event.option.value.name;
    }
  }


  isAnyFieldNotEmpty = false;
  MAIN_SELECTED_TICKET_DATA: Tickets = new Tickets()
  //CHECK IF ANY FILED HAS CHANGED BEFORE EXIt
  onInputChange() {
    if (JSON.stringify(this.MAIN_SELECTED_TICKET_DATA) !== JSON.stringify(this.ADDED_TICKET)) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
    this.isAnyFieldNotEmpty = Object.values(this.ADDED_TICKET).some(val => val !== '' && val !== null);

    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);

    }

  }

  //GET THE STATUS CLASS
  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'completed':
        return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'canceled':
        return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      default:
        return '';
    }
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  // SET UPDATE VALUES
  UPDATE(obj: Tickets): void {
    this.MAIN_SELECTED_TICKET_DATA = obj;
    this.WHOLESALER_SELECTED.id = obj.wholesaler.id
    this.WHOLESALER_SELECTED.name = obj.wholesaler.name

    this.ShowAddButoon = false;
    this.ADDED_TICKET = { ...obj };
    this.currentAction = 'Update Ticket';
    this.open_expansion_value = 1;
    this.panelOpenState = true;
    this.routeSignalService.show_pop_up_route.set(false);
  }


  //UPDATE TICKET
  UPDATE_TICKET() {
    this.SHOW_LOADING_SPINNER = true;
    this.ticketingService.UPDATE_TICKETING(this.ADDED_TICKET).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS();
        this.CLEAR_VALUES(this.ADDED_TICKET)
        this.currentAction = 'Add Ticket';
        this.open_expansion_value = -1;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;

      }
    });

  }

  onWholesalerSelected(event: any) {
    this.WHOLESALER_SELECTED = { id: '', name: '' }

    if (event.option.value == 'Add New wholesaler') {
      this.OPEN_DIALOG('Add New Wholesaler', this.NEW_WHOLESALER_ADDED)
      this.CHECK_IF_CHANGED_WHOLESALER_NAME()
    }

    else {
      this.WHOLESALER_SELECTED =
      {
        id: event.option.value._id,
        name: event.option.value.name,
      }
      this.ADDED_TICKET.wholesaler.id = this.WHOLESALER_SELECTED.id
      this.ADDED_TICKET.wholesaler.name = this.WHOLESALER_SELECTED.name
      this.CHECK_IF_CHANGED_WHOLESALER_NAME()
    }
    this.selectedWholesalerId = this.WHOLESALER_SELECTED.id;
  }
  selectedCustomerId: string =''
  selectedWholesalerId: string =''
  onCustomerSelected(event: any) {
    this.CUSTOMER_SELECTED = { id: '', name: '' }

    if (event.option.value == 'Add New customer') {
      this.OPEN_DIALOG('Add New Customer', this.NEW_CUSTOMER_ADDED)
      this.CHECK_IF_CHANGED_CUSTOMER_NAME()
    }

    else {
      this.CUSTOMER_SELECTED =
      {
        id: event.option.value._id,
        name: event.option.value.name,
      }

      this.ADDED_TICKET.name = this.CUSTOMER_SELECTED.name
      this.CHECK_IF_CHANGED_CUSTOMER_NAME()
    }
         // Store the selected customer ID
         this.selectedCustomerId = this.CUSTOMER_SELECTED.id;
  }

  CHECK_IF_CHANGED_CUSTOMER_NAME() {
    if (this.MAIN_SELECTED_TICKET_DATA.wholesaler.name !== this.CUSTOMER_SELECTED.name) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
  }

  CHECK_IF_CHANGED_WHOLESALER_NAME() {
    if (this.MAIN_SELECTED_TICKET_DATA.wholesaler.name !== this.CUSTOMER_SELECTED.name) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
  }


  //CLEAR OBJECT VALUES
  CLEAR_VALUES(obj: Tickets) {
    this.ADDED_TICKET = {
      _id: '',
      name: '',
      wholesaler: {
        id: '',
        name: ''
      },
      source: '',
      destination: '',
      balance: '',
      cost: '',
      credit: '',
      note: '',
      seats: '',
      status: ''
    }

    this.WHOLESALER_SELECTED = {
      id: '', name: ''
    }

    this.searchQuery = ''
    this.searchQuery1 = ''
    this.open_expansion_value = -1;
    this.routeSignalService.show_pop_up_route.set(false);

    this.panelClosed()
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogTicket-content',
  templateUrl: './Ticketing-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppTicketingDialogContentComponent {

  action: string;
  TICKET_SELECTED: any = new Tickets();
  ADDED_WHOLESALER: WholesalerClass = new WholesalerClass();
  NEW_CUSTOMER: CustomerClass = new CustomerClass()
  constructor(
    public dialogRef: MatDialogRef<AppTicketingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.TICKET_SELECTED = { ...data };
    this.action = this.data.action;
  }

  doAction(): void {
    this.action = this.data.action;
    if (this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.TICKET_SELECTED });
    }
    if (this.action === 'Add New Wholesaler') {
      this.dialogRef.close({ event: this.action, data: this.ADDED_WHOLESALER });
    }
    if (this.action === 'Add New Customer') {
      this.dialogRef.close({ event: this.action, data: this.NEW_CUSTOMER });
    }
  }
  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}






