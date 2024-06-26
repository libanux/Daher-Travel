
import { Component, OnInit, Inject, Optional, ViewChild, effect, Input } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PackageService } from 'src/app/services/package.service';
import { Date_Filter_Array, Download_Options, GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { Package } from 'src/app/classes/package.class';
import { CustomerService } from 'src/app/services/Customer.service';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { CustomerClass } from 'src/app/classes/customer.class';
import { Tickets } from 'src/app/classes/tickets.class';



@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['../../../../assets/scss/apps/general_table.scss', '../../../../assets/scss/apps/_add_expand.scss'],
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
export class AppTicketlistComponent implements OnInit {
  @Input() showAddSection = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  ShowAddButoon = true;
  selectedMonth: string = 'thisMonth';
  statusValue: string = ''
  show_shimmer = true;
  //MAIN PACKAGE ARRAY
  packages: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;


  //PACKAGE ON EDIT
  editedpackage: Package = new Package()
  selectedDownloadOption: string = 'Download'
  Options: any[] = Download_Options;
  //TABLE COLUMNS
  displayedColumns: string[] = ['customer', 'source', 'destination', 'numberOfPeople', 'duration', 'cost', 'sell', 'hotels', 'note', 'status', 'action'];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Package | null = null;

  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;


  //MONTHS FOR FILTER DROPDOWN
  months: any[] = Month_Filter_Array

  //FILTRATION ARRAY
  Filteration: any[] = Date_Filter_Array

  showDatePicker = false;

  //PACKAGES
  dataSource = new MatTableDataSource(this.packages);

  packageExample = new Package();
  pageSize = 10;
  currentPage = 1;


  // 1 basic
  panelOpenState = false;
  open_expansion_value = 0;

  CurrentAction: string = 'Add Package'
  NEW_CUSTOMER_ADDED: CustomerClass[] = []

  constructor(private routeSignalService: RouteSignalService, public dialog: MatDialog, private packagesService: PackageService, private breadCrumbService: BreadCrumbSignalService, private customerService: CustomerService, private generalService: GeneralService) {
    this.editedpackage = new Package()
    this.editedpackage.status = 'pending'
    this.editedpackage.sell = 1
    this.editedpackage.cost = 1
    this.editedpackage.numberOfPeople = 1
    this.editedpackage.duration = 1

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Packages')
    this.FETCH_PACKAGES();
  }
  onDateSelect(date: Date) {
    // console.log('Selected Date:', date);
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.FETCH_PACKAGES()
  }


  cancelSelection() {
    this.showCalendar = false;
    this.selectedMonth = '';
    this.selectedDate = null;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  filteredCustomers: any[] = []
  allCustomers: any = []
  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.customerService.GET_ALL_CUSTOMERS_WITH_NO_PAGING().subscribe({
      next: (response: any) => {
        this.allCustomers = response.customers;
        this.filteredCustomers = response.customers;
        console.log("Cust", response)
      },
      error: (error) => { },
      complete: () => {

      }
    });
  }

  filterCustomers() {
    const query = this.CUSTOMER_SELECTED.name.toLowerCase();
    this.filteredCustomers = this.allCustomers.filter((customer: any) =>
      customer.name.toLowerCase().includes(query)
    );
  }
  isAnyFieldNotEmpty = false;
  //CHECK IF ANY FILED HAS CHANGED BEFORE EXIt
  onInputChange() {
    this.isAnyFieldNotEmpty = Object.values(this.editedpackage).some(val => val !== '' && val !== null);

    if (this.isAnyFieldNotEmpty) {

      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);

    }

  }

  // OPEN DIALOG TO MAKE SURE OF DELETION
  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(AppPackageDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {

   

       if (result.event === 'Delete') {
        this.DELETE_PACKAGE(obj);
      }

      else if (result.event === 'Add New Customer') {
        this.ADD_NEW_CUSTOMER(result.data);
        this.CUSTOMER_SELECTED = result.data.name
      }
    });
  }

  ADD_NEW_CUSTOMER(obj: CustomerClass) {
    this.customerService.ADD_CUSTOMER(obj).subscribe({

      next: (response: any) => {
        console.log("res", response)
        this.CUSTOMER_SELECTED.id = response._id
        this.CUSTOMER_SELECTED.name = response.name;
        console.log('Response:', response)

      },
      error: (error) => { },
      complete: () => {
        this.FETCH_CUSTOMER();
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



  //FETCH PACKAGES FROM API
  FETCH_PACKAGES(): void {
    this.packagesService.GET_PACKAGES(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        console.log("PACKAGESS:", response)
        this.show_shimmer = false
        this.packages = response.packages;
        this.totalCount = response.pagination.totalPackages


      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
        this.FETCH_CUSTOMER();
      }
    });
  }

  //SEARCH & FILTER  PACKAGES 
  SEARCH_PACKAGES(): void {

    this.packagesService.SEARCH_FILTER_PACKAGE(this.pageSize, this.currentPage, this.searchText, this.selectedMonth, this.statusValue, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {

        this.packages = response.packages;
        this.totalCount = response.pagination.totalPackages
      },
      error: (error: any) => {
        this.packages = []
        this.totalCount = 0;
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }


  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.open_expansion_value = -1;
  }


  //DATE AND STATUS DROPDOWN CHANGE
  onChange(dropdown: string) {
    if (dropdown == 'month') {
      if (this.selectedMonth === 'Calendar') {
        this.selectedMonth = 'custom'
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.SEARCH_PACKAGES()
      }
    }

    else if (dropdown == 'status') {
      this.SEARCH_PACKAGES()
    }
    else if (dropdown == 'Download') {
      this.DOWNLOAD();
    }
  }
  DATA_CHANGED: boolean = false;
  CUSTOMER_SELECTED = { id: '', name: '' }
  PREVIOUS_CUSTOMER_SELECTED = { id: '', name: '' }
  MAIN_SELECTED_PACKAGE_DATA: Package = new Package()
  onCustomerSelected(event: any) {
    console.log("Event", event)
    if (event != 'Add New Customer') {

      this.CUSTOMER_SELECTED =
      {
        id: event._id,
        name: event.name,
      }

      console.log("Customer selected", this.CUSTOMER_SELECTED)

      if (JSON.stringify(this.PREVIOUS_CUSTOMER_SELECTED) == JSON.stringify(this.CUSTOMER_SELECTED)) {
        console.log('CUSTOMER_SELECTED EQUAL')
      }

      else {
        this.PREVIOUS_CUSTOMER_SELECTED = { ...this.CUSTOMER_SELECTED }
        this.editedpackage.customer.id = this.CUSTOMER_SELECTED.id
        this.editedpackage.customer.name = this.CUSTOMER_SELECTED.name
        this.CHECK_IF_CHANGED_CUSTOMER_NAME()
      }
    }

    else {
      this.CUSTOMER_SELECTED = { id: '', name: '' }
      this.OPEN_DIALOG('Add New Customer', this.NEW_CUSTOMER_ADDED)
      this.CHECK_IF_CHANGED_CUSTOMER_NAME()
    }


  }

  CHECK_IF_CHANGED_CUSTOMER_NAME() {
    if (this.MAIN_SELECTED_PACKAGE_DATA.customer.name !== this.CUSTOMER_SELECTED.name) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
  }
  DOWNLOAD() {
    this.generalService.getData('EXPORT_PACKAGES_TO_EXCEL')

  }

  //FILTER PACKAGES BY STATUS
  FILTER_PACKAGES(status: string) {
    this.currentPage = 1;
    this.packagesService.FILTER_PACKAGES_BY_STATUS(this.pageSize, this.currentPage, status).subscribe({
      next: (response: any) => {
        this.packages = response.packages;
        this.dataSource = new MatTableDataSource(this.packages);
        this.totalCount = response.pagination.totalPackages;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }


  //FILTER PACKAGES BY DATE
  FILTER_PACKAGES_BY_DATE(filter: string) {
    this.packagesService.FILTER_PACKAGE_BY_DATE(filter, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.packages = response;
        this.dataSource = new MatTableDataSource(this.packages);
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }
  startDateValue: string = ''; // Variable to store the start date
  endDateValue: string = ''; // Variable to store the end date

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_PACKAGES_BY_DATE('custom')

  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_PACKAGES_BY_DATE('custom')

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




  // SHOW BUTTON UPDATE AND SET INPUTS
  UPDATE(obj: Package): void {
    this.CUSTOMER_SELECTED = { id: '', name: '' }
    this.ShowAddButoon = false;
    this.editedpackage = { ...obj };
    this.CUSTOMER_SELECTED =
    {
      id: this.editedpackage.customer.id,
      name: this.editedpackage.customer.name,
    }
    this.CUSTOMER_SELECTED.id= this.editedpackage.customer.id
    this.CUSTOMER_SELECTED.name= this.editedpackage.customer.name
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  //UPDATE PACKAGE VALUES
  UPDATE_PACKAGE() {
    this.editedpackage.customer =
    {
      id: this.CUSTOMER_SELECTED.id,
      name: this.CUSTOMER_SELECTED.name,
    }

    this.packagesService.UPDATE_PACKAGE(this.editedpackage).subscribe({
      next: (response: any) => {
        this.FETCH_PACKAGES();
        this.CLEAR_VALUES(this.editedpackage)
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });

  }

  //ADD NEW RECRUITING RECORD
  ADD_PACKAGE(): void {
    this.editedpackage.customer =
    {
      id: this.CUSTOMER_SELECTED.id,
      name: this.CUSTOMER_SELECTED.name,
    }
    console.log('EDITED PACK', this.editedpackage)
    this.packagesService.ADD_PACKAGE(this.editedpackage).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.editedpackage)
      
      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
        this.FETCH_PACKAGES()
      }
    });
  }



  //CLEAR OBJECT VALUES
  CLEAR_VALUES(obj: Package) {
    obj._id = '';
    // obj.customerName = '';
    this.CUSTOMER_SELECTED =  { id: '', name: '' }
    obj.source = '';
    obj.destination = '';
    obj.duration = 0;
    obj.hotels = '';
    obj.numberOfPeople = 0;
    obj.cost = 0;
    obj.sell = 0;
    obj.note = '';
    obj.status = '';
    this.panelClosed()
  }




  DELETE_PACKAGE(element: Package) {
    this.packagesService.DELETE_PACKAGE(element).subscribe({
      next: (response: any) => {
        this.FETCH_PACKAGES()
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => { }
    });
  }

  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  //TRUNCATE THE TEXT INTO 20 CHARS
  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
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
}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'ticket-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppPackageDialogContentComponent {



  action: string;
  PACKAGE_SELECTED: Package = new Package();
  NEW_CUSTOMER: CustomerClass = new CustomerClass()
  constructor(
    public dialogRef: MatDialogRef<AppPackageDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.PACKAGE_SELECTED = { ...data };
    this.action = data.action;
  }

  doAction(): void {
   
    if (this.action === 'Add New Customer') {
      this.dialogRef.close({ event: this.action, data: this.NEW_CUSTOMER });
    }else{
      this.dialogRef.close({ event: this.action, data: this.PACKAGE_SELECTED });
    }
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

