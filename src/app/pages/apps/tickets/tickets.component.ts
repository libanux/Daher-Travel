import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketingService } from 'src/app/services/ticketing.service';
import { Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { Tickets } from 'src/app/classes/tickets.class';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { CustomerService } from 'src/app/services/Customer.service';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss', '../../../../assets/scss/apps/_add_expand.scss'],
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
  startDateValue: string = ''; // Variable to store the start date
  endDateValue: string = ''; // Variable to store the end date
  show_shimmer = true
  currentAction: string = 'Add Ticket';



  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'cost',
    'credit',
    'source',
    'destination',
    'note',
    'action',
  ];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Tickets | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  // These two valus are used for the add expnad row in the top of the page
  panelOpenState = false;
  open_expansion_value = 0;

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
    seats: ''
  }

  searchQuery: string;
  constructor(private wholesaler: WholesalerService, private customerService: CustomerService, private routeSignalService: RouteSignalService, public dialog: MatDialog, private ticketingService: TicketingService, private breadCrumbService: BreadCrumbSignalService) {


  }

  trackById(index: number, item: any): number {
    return item.id; // Return a unique identifier for each item (e.g., item's ID)
  }


  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Ticketing')
    this.FETCH_TICKETINGS();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  pageSize = 10;
  currentPage = 1;
  filteredCustomers: any[] = []

  //FETCH TICKETINGS FROM API
  FETCH_TICKETINGS(): void {
    this.ticketingService.GET_TICKETINGS(this.pageSize, this.currentPage).subscribe({
      next: (response: any) => {
        this.show_shimmer = false;
        this.tickets = response.ticketings
        this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTicketings

        console.log("In tickets")
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
        this.FETCH_CUSTOMER()

      }
    });
  }
  allWholesalers: any[] = []
  filteredWholeSalers: any[] = []
  // GET ALL WHOLESALERS
  FETCH_WHOLESALERS() {
    this.wholesaler.GET_ALL_WHOLESALERS_WITH_NO_PAGING().subscribe({
      next: (response: any) => {
        this.allWholesalers = response.wholesalers
        this.filteredWholeSalers = response.wholesalers
        console.log("In wholesalers")
      },
      error: (error) => {
        console.log("Error wholesaler", error)
      },
      complete: () => { }
    });
  }

  allCustomers: any = []
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
  searchQuery1: string = ''
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
  addNewProduct() {
    // Logic to add a new product
    console.log('Add new product clicked');
  }


  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_TICKETS_BY_DATE('custom')

  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_TICKETS_BY_DATE('custom')

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


  showDatePicker: boolean = false;
  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_TICKETS_BY_DATE(value)
      }
    }
  }


  //FILTER PACKAGES BY DATE
  FILTER_TICKETS_BY_DATE(filter: string) {
    this.ticketingService.FILTER_TICKETS_BY_DATE(filter, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.tickets = response;
        console.log("Response:", response)
        this.dataSource = new MatTableDataSource(this.tickets);
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.FETCH_TICKETINGS()
  }
  choosenWholesaler: WholesalerClass
  //ADD NEW TICKET
  ADD_TICKETINGS(): void {


    console.log("Added ticket:", this.ADDED_TICKET);

    this.ticketingService.ADD_TICKETING(this.ADDED_TICKET).subscribe({
      next: (response: any) => {
        console.log("Response on add ", response)
        this.CLEAR_VALUES(this.ADDED_TICKET);
        this.FETCH_TICKETINGS();
      },
      error: (error: any) => {
        console.log("Error:", error);
      },
      complete: () => {
        this.open_expansion_value = -1;
      }
    });
  }


  //FETCH TICKETS FROM API
  SEARCH_TICKETS(event: any): void {
    this.currentPage = 1;

    this.ticketingService.SEARCH_TICKETS(this.pageSize, this.currentPage, event.target.value).subscribe({
      next: (response: any) => {

        this.tickets = response.tickets;
        this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTickets
      },
      error: (error: any) => {
        this.tickets = []
        this.totalCount = 0;
        console.log("Error:", error)
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
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }


  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.open_expansion_value = -1;
    this.CLEAR_VALUES(this.ADDED_TICKET);
    this.currentAction = 'Add Ticket';
    this.routeSignalService.show_pop_up_route.set(false);
  }


  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }
  onOptionSelected(event: MatAutocompleteSelectedEvent, source: string) {
    if (source == 'customer') {
      this.ADDED_TICKET.name = event.option.value.name
    } else {
      this.choosenWholesaler = event.option.value;
      this.ADDED_TICKET.wholesaler.id = event.option.value._id; // Assigning id
      this.ADDED_TICKET.wholesaler.name = event.option.value.name;
      console.log('Selected wholesaler:', this.choosenWholesaler);
    }

  }
  isAnyFieldNotEmpty = false; // Flag to track if any field has content
  // Function to log input changes
  onInputChange() {
    this.isAnyFieldNotEmpty = Object.values(this.ADDED_TICKET).some(val => val !== '' && val !== null);
    console.log(this.ADDED_TICKET)

    if (this.isAnyFieldNotEmpty) {

      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {

      this.routeSignalService.show_pop_up_route.set(false);

    }

    // You can perform additional actions based on the field name or value if needed
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

  // OPEN UPDATE & DELETE DIALOGS
  openDialog(action: string, delTicket: Tickets): void {
    const dialogRef = this.dialog.open(AppTicketingDialogContentComponent, {
      data: { action, delTicket }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Delete') {
        this.ticketingService.DELETE_TICKETING(delTicket).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.FETCH_TICKETINGS()
          },
          error: (error: any) => {
            console.error('Error:', error);
          },
          complete: () => { }
        });
      }
    });
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }



  // SET UPDATE VALUES
  UPDATE(obj: Tickets): void {
    console.log("Ticket to update:", obj)
    this.ShowAddButoon = false;
    this.ADDED_TICKET = { ...obj };
    this.currentAction = 'Update Ticket';
    console.log(" updated:", this.ADDED_TICKET)
    this.open_expansion_value = 1;
    this.panelOpenState = true;

    this.routeSignalService.show_pop_up_route.set(false);
  }


  //UPDATE TICKET
  UPDATE_TICKET() {
    this.ticketingService.UPDATE_TICKETING(this.ADDED_TICKET).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS();
        this.CLEAR_VALUES(this.ADDED_TICKET)
        this.currentAction = 'Add Ticket';
        this.open_expansion_value = -1;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });

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
      seats: ''
    }
    this.searchQuery = ''
    this.searchQuery1 = ''
    this.open_expansion_value = -1;
    this.routeSignalService.show_pop_up_route.set(false);

    this.panelClosed()
  }
}
interface month {
  value: string;
  viewValue: string;
}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogTicket-content',
  templateUrl: './recruiting-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppTicketingDialogContentComponent {
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  TICKET_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<AppTicketingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tickets,
  ) {
    this.TICKET_SELECTED = { ...data };
    this.action = this.TICKET_SELECTED.action;
    console.log(this.TICKET_SELECTED)
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.TICKET_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}



