import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketingService } from 'src/app/services/ticketing.service';
import { GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
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
  selectedMonth: string = 'thisMonth';
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
  ADDED_WHOLESALER: WholesalerClass
  choosenWholesaler: WholesalerClass

  //TABLE COLUMNS
  displayedColumns: string[] = ['name', 'source', 'destination', 'cost', 'credit', 'balance', 'note', 'action',];
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
    seats: ''
  }

  searchQuery: string;
  searchQuery1: string = ''

  constructor(private wholesaler: WholesalerService, private customerService: CustomerService, private routeSignalService: RouteSignalService, public generalService: GeneralService, public dialog: MatDialog, private ticketingService: TicketingService, private breadCrumbService: BreadCrumbSignalService) {
  }


  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Ticketing')
    this.FETCH_TICKETINGS();

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

      }
    });
  }


  OPEN_DIALOG(action: string, obj: any): void {
    this.ADDED_WHOLESALER = obj
    const dialogRef = this.dialog.open(AppTicketingDialogContentComponent, {
      data: { action, obj },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add Wholesaler') {
        this.ADD_WHOLESALER(result.data);
      }
      else if (result.event === 'Delete') {
        this.DELETE_TICKETING(obj)
      }
    });
  }


  //ADD NEW WHOLESALER
  ADD_WHOLESALER(wholesaler: any) {
    this.wholesaler.ADD_WHOLESALER(wholesaler).subscribe({
      next: (response: any) => {
        console.log("Response:", response)
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => { }
    });
  }


  //DELETE TICKETING RECORD
  DELETE_TICKETING(ticket: any) {
    this.ticketingService.DELETE_TICKETING(ticket).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS()
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => { }
    });
  }

  // GET ALL WHOLESALERS
  FETCH_WHOLESALERS() {
    this.wholesaler.GET_ALL_WHOLESALERS_WITH_NO_PAGING().subscribe({
      next: (response: any) => {
        this.allWholesalers = response.wholesalers
        this.filteredWholeSalers = response.wholesalers
      },
      error: (error) => {
        console.error("Error wholesaler", error)
      },
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

  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }
      else {
        this.showDatePicker = false;
        this.selectedMonth = value;
        this.SEARCH_TICKETS()
      }
    }
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
    this.ticketingService.ADD_TICKETING(this.ADDED_TICKET).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.ADDED_TICKET);
        this.FETCH_TICKETINGS();
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
      complete: () => {
        this.open_expansion_value = -1;
      }
    });
  }


  //FETCH TICKETS FROM API
  SEARCH_TICKETS(): void {
    this.currentPage = 1;
    this.ticketingService.SEARCH_FILTER_TICKETS(this.pageSize, this.currentPage, this.searchText, this.selectedMonth, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.tickets = response.ticketings;
        this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTickets
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
      this.ADDED_TICKET.wholesaler.name = event.option.value.name;
    }
  }


  isAnyFieldNotEmpty = false;

  //CHECK IF ANY FILED HAS CHANGED BEFORE EXIt
  onInputChange() {
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
    this.ShowAddButoon = false;
    this.ADDED_TICKET = { ...obj };
    this.currentAction = 'Update Ticket';
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

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogTicket-content',
  templateUrl: './Ticketing-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppTicketingDialogContentComponent {

  action: string;
  TICKET_SELECTED: any;
  ADDED_WHOLESALER: WholesalerClass = new WholesalerClass();

  constructor(
    public dialogRef: MatDialogRef<AppTicketingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.TICKET_SELECTED = { ...data };
    this.action = this.data.action;
  }

  doAction(): void {
    if (this.action == 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.TICKET_SELECTED });
    }
    else if (this.action = 'Add Wholesaler') {
      this.dialogRef.close({ event: this.action, data: this.ADDED_WHOLESALER });
    }
  }
  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}






