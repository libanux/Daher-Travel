
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
  selectedMonth: string = '';
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
  startDateValue: string = '';
  endDateValue: string = '';
  SHOW_LOADING_SPINNER: boolean = false;
  //MONTHS FOR FILTER DROPDOWN
  months: any[] = Month_Filter_Array

  //FILTRATION ARRAY
  Filteration: any[] = Date_Filter_Array

  showDatePicker = false;

  //PACKAGES
  dataSource = new MatTableDataSource(this.packages);
  pageSize = 10;
  currentPage = 1;

  // 1 basic
  panelOpenState = false;
  open_expansion_value = 0;
  filteredCustomers: any[] = []
  allCustomers: any = []
  CurrentAction: string = 'Add Package'
  NEW_CUSTOMER_ADDED: CustomerClass[] = []
  isAnyFieldNotEmpty = false;
  MAIN_SELECTED_PACKAGE_DATA: Package = new Package()
  DATA_CHANGED: boolean = false;
  CUSTOMER_SELECTED = { id: '', name: '' }
  PREVIOUS_CUSTOMER_SELECTED = { id: '', name: '' }

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




  //CHECK IF ANY FILED HAS CHANGED BEFORE EXIt
  onInputChange() {

    if (JSON.stringify(this.MAIN_SELECTED_PACKAGE_DATA) !== JSON.stringify(this.editedpackage)) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
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


 //-------------------------------------------------------------FETCH & SEARCH PACKAGES---------------------------------------------------------------------
  //FETCH PACKAGES FROM API
  FETCH_PACKAGES(): void {
    this.packagesService.GET_PACKAGES(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
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
    this.paginator.firstPage();
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
  // THIS FUNCTION IS FOR THE PAGING TO GO TO PREVOIUS PAGE
  goToPreviousPage(): void {
    if (this.paginator && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  //-------------------------------------------------------------DROPDOWN & FILTERS HANDELING---------------------------------------------------------------------
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


  onCustomerSelected(event: any) {
    if (event != 'Add New Customer') {

      this.CUSTOMER_SELECTED =
      {
        id: event._id,
        name: event.name,
      }
      if (JSON.stringify(this.PREVIOUS_CUSTOMER_SELECTED) == JSON.stringify(this.CUSTOMER_SELECTED)) {
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

  ADD_NEW_CUSTOMER(obj: CustomerClass) {

    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => {
        this.CUSTOMER_SELECTED.id = response._id
        this.CUSTOMER_SELECTED.name = response.name;
      },
      error: (error) => { },
      complete: () => {
        this.FETCH_CUSTOMER();
      }
    });
  }

  CHECK_IF_CHANGED_CUSTOMER_NAME() {
    if (this.MAIN_SELECTED_PACKAGE_DATA.customer.name !== this.CUSTOMER_SELECTED.name) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }
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
  
        }
      });
    }
  
    filterCustomers() {
      const query = this.CUSTOMER_SELECTED.name.toLowerCase();
      this.filteredCustomers = this.allCustomers.filter((customer: any) =>
        customer.name.toLowerCase().includes(query)
      );
    }
   //-------------------------------------------------------------EXCEL DOWNLOAD---------------------------------------------------------------------
  DOWNLOAD() {
    this.generalService.getData('EXPORT_PACKAGES_TO_EXCEL')

  }


 //-------------------------------------------------------------HANDELING DATE CHANGES AND FORMATTING---------------------------------------------------------------------
  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);

  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.SEARCH_PACKAGES()
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

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }


    //-------------------------------------------------------------ADD + UPDADE + DELETE +CLEAR VALUES---------------------------------------------------------------------


  // SHOW BUTTON UPDATE AND SET INPUTS
  UPDATE(obj: Package): void {
    this.MAIN_SELECTED_PACKAGE_DATA = obj
    this.CUSTOMER_SELECTED = { id: '', name: '' }
    this.ShowAddButoon = false;
    this.editedpackage = { ...obj };
    this.CUSTOMER_SELECTED =
    {
      id: this.editedpackage.customer.id,
      name: this.editedpackage.customer.name,
    }
    this.CUSTOMER_SELECTED.id = this.editedpackage.customer.id
    this.CUSTOMER_SELECTED.name = this.editedpackage.customer.name
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }


  //UPDATE PACKAGE VALUES
  UPDATE_PACKAGE() {
    this.SHOW_LOADING_SPINNER = true;
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
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;
      }
    });

  }

  //ADD NEW PACKAGE
  ADD_PACKAGE(): void {
    this.SHOW_LOADING_SPINNER = true;
    this.editedpackage.customer =
    {
      id: this.CUSTOMER_SELECTED.id,
      name: this.CUSTOMER_SELECTED.name,
    }
    this.packagesService.ADD_PACKAGE(this.editedpackage).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.editedpackage)
      },
      error: (error: any) => {
        console.error("Error:", error)
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;
        this.FETCH_PACKAGES()
      }
    });
  }

  //CLEAR OBJECT VALUES
  CLEAR_VALUES(obj: Package) {
    obj._id = '';
    // obj.customerName = '';
    this.CUSTOMER_SELECTED = { id: '', name: '' }
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


  //DELETE A PACKAGE
  DELETE_PACKAGE(element: Package) {
    this.show_shimmer = true;
    this.packagesService.DELETE_PACKAGE(element).subscribe({
      next: (response: any) => {
        this.FETCH_PACKAGES()
      },
      error: (error: any) => {
        console.error('Error:', error);
      },
      complete: () => { 
        this.goToPreviousPage()
      }
    });
  }

  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.open_expansion_value = -1;
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

  //-------------------------------------------------------------PACKAGE DIALOG TS---------------------------------------------------------------------
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
    } else {
      this.dialogRef.close({ event: this.action, data: this.PACKAGE_SELECTED });
    }
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

