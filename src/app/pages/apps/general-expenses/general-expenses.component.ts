import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerClass } from 'src/app/classes/customer.class';
import { GeneralExpense } from 'src/app/classes/general-expense.class';
import { GeneralFinance } from 'src/app/classes/general-finance.class';
import { Visa_Status_Array, VisaType_Array, Visa_Status_Array_FILTERATION } from 'src/app/classes/visaClass';
import { AdminService } from 'src/app/services/Admins.service';
import { CustomerService } from 'src/app/services/Customer.service';
import { GeneralExpenseService } from 'src/app/services/general-expense.service';
import { Month_Filter_Array, Download_Options, GeneralService } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { RouteSignalService } from 'src/app/signals/route.signal';

@Component({
  selector: 'app-general-expenses',
  templateUrl: './general-expenses.component.html',
  styleUrls:[ '../../../../assets/scss/apps/_add_expand.scss',
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
export class GeneralExpensesComponent {


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


 NEW_GENERAL_FINANCE_ADDED: GeneralFinance = new GeneralFinance()
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
'amount',
 'description',
 'createdAt',
 'action'
 ];

 // This is the added or updated VISA fdefualt values
 ADDED_GENERAL_EXPENSE: GeneralExpense = new GeneralExpense()
 MAIN_SELECTED_GENERAL_EXPENSE_DATA: GeneralExpense = new GeneralExpense()

 pageSize = 10;
 General_Expense_Array_length = 0
 Current_page = 1

 showCalendar: boolean = false;
 selectedMonth: string = '';
 selectedStatusFilteraTION: string = '';
 selectedDate: Date | null = null; // Adjusted the type to accept null

 CurrentAction = 'Add General Expense'
 columnsToDisplayWithExpand = [...this.displayedColumns];
 expandedElement: GeneralFinance | null = null;
 GeneralExpenseArray = new MatTableDataSource();
 // CUSTOMER_SELECTED: CustomerClass = new CustomerClass();
 CUSTOMER_SELECTED = { id: '', name: '', phoneNumber: '' }

 SHOW_LOADING_SPINNER: boolean = false;

 // Storing the start and end date selected in filtering by Date
 // Used in filter by date

 constructor(
   private customerService: CustomerService,
   private routeSignalService: RouteSignalService,
   private breadCrumbService: BreadCrumbSignalService,
   private generalService: GeneralService,
   public dialog: MatDialog, private generalExpense: GeneralExpenseService) {

 }

 ADMIN_LOGGED_IN_VISA_PERMISSION: string
 adminID: string 

 ngOnInit(): void {
   this.adminID = localStorage.getItem('admin_id') || '';
   this.breadCrumbService.currentRoute.set('General Expense');
   this.FETCH_GENERAL_EXPENSE()

 }

 selectedDownloadOption: string = 'Download as';
 DOWNLOAD(OPTION: string) {
   this.generalService.getData('EXPORT_VISAS_TO_EXCEL')
 }

 showToggle = true;


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

       this.FILTER_TYPE = value;

       this.FILTER_ARRAY_BY_DATE(value)
     }
   }

   // Status filtering
   else if (dropdown == 'status') {
     if (value == 'all') {
       this.FILTER_ARRAY_BY_STATUS('')
       this.STATUS = ''
     }
     else {
       this.FILTER_ARRAY_BY_STATUS(value)
       this.STATUS = value
     }
   }

   else if (dropdown == 'Download') {
     this.DOWNLOAD(value);
     this.selectedDownloadOption = 'Download as';
   }
 }

 // OPEN DIALOG TO MAKE SURE OF DELETION
 OPEN_DIALOG(action: string, obj: any): void {
   obj.action = action;

   const dialogRef = this.dialog.open(GeneralExpenseDialogContentComponent, {
     data: obj,
   });

   dialogRef.afterClosed().subscribe((result) => {

     if (result.event === 'CancelAdd') {
       this.CUSTOMER_SELECTED = { id: '', name: '', phoneNumber: '' }

       this.ADDED_GENERAL_EXPENSE = {
         _id: this.ADDED_GENERAL_EXPENSE._id,
         amount: this.ADDED_GENERAL_EXPENSE.amount,
         description: this.ADDED_GENERAL_EXPENSE.description,
       }

     }

     else if (result.event === 'Delete') {
       this.DELETE_GENERAL_EXPENSE(obj._id);
     }


   });
 }


 // Method to handle the panel closed event
 CLOSE_PANEL() {
     this.open_expansion_value = 0;
     this.panelOpenState = false
 }

 OPEN_PANEL() {
     this.open_expansion_value = 1;
     this.panelOpenState = true;
 }


 //  PAGING

 // function when page number changes
 onPageChange(event: PageEvent): void {
   this.pageSize = event.pageSize;

   if (this.STATUS != '' || this.FILTER_TYPE != '') {
     this.Current_page = event.pageIndex + 1;
     this.FILTER_GENERAL_EXPENSE(this.SEARCK_KEY, this.FILTER_TYPE, this.START_DATE, this.END_DATE, this.STATUS)
   }

   else {
     this.Current_page = event.pageIndex + 1;
     this.FETCH_GENERAL_EXPENSE();
   }

 }

 // THIS FUNCTION IS FOR THE PAGING TO GO TO PREVOIUS PAGE
 goToPreviousPage(): void {
   if (this.paginator && this.paginator.hasPreviousPage()) {
     this.paginator.previousPage();
   }
 }


 isAnyFieldNotEmpty = false; // Flag to track if any field has content
 // Function to log input changes
 onInputChange() {
   // When inputs changes -> i check if they are the same as the main one
   // if they are the same keep the update button disabled
   if (JSON.stringify(this.MAIN_SELECTED_GENERAL_EXPENSE_DATA) !== JSON.stringify(this.ADDED_GENERAL_EXPENSE)) {
     this.DATA_CHANGED = true;
   }
   else {
     this.DATA_CHANGED = false;
   }

   // Check only specific fields for content
   this.isAnyFieldNotEmpty = Object.values(this.ADDED_GENERAL_EXPENSE).some(val => val !== '' && val !== null);
   if (this.isAnyFieldNotEmpty) {
     this.routeSignalService.show_pop_up_route.set(true);
   }
   else {
     this.routeSignalService.show_pop_up_route.set(false);
   }
 }


 // CUSTOMERS

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

 disabledselection = false;

 // DATE SELECTION

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

 // GET ALL GENERAL EXPENSE
 FETCH_GENERAL_EXPENSE() {
   this.show_shimmer = true;
   this.generalExpense.GET_ALL_GENERAL_EXPENSES(this.Current_page, this.pageSize).subscribe({
     next: (response: any) => {
       console.log(response)
       this.current_page_array_length = response.expenses.length
       this.General_Expense_Array_length = response.pagination.totalExpenses;
       this.GeneralExpenseArray = new MatTableDataSource(response.expenses);
     },
     error: (error) => { 
      this.show_shimmer=false;
     },
     complete: () => {
       this.show_shimmer = false;
       this.CANCEL_UPDATE();
     }
   });
 }

 // CANCEL UPDATE
 CANCEL_UPDATE(): void {
   this.CurrentAction = 'Add General Expense';
   this.ShowAddButoon = true;
   this.routeSignalService.show_pop_up_route.set(false)
   this.SHOW_LOADING_SPINNER = false
   this.DATA_CHANGED = false;
   this.MAIN_SELECTED_GENERAL_EXPENSE_DATA = new GeneralExpense()
   this.ADDED_GENERAL_EXPENSE.amount=''
   this.ADDED_GENERAL_EXPENSE.description =''
   // CLOSE THE PANEL
   this.CLOSE_PANEL()
 
 }

 // DELETE GENERAL EXPENSE
 DELETE_GENERAL_EXPENSE(ID: number): void {
   this.generalExpense.DELETE_GENERAL_EXPENSE(ID).subscribe({
     next: (response: any) => {
       // CHECK IF I AM DELETING THE LAST ITEM LEFT IN THE PAGE I AM AT
       // IF YES --> GO BACK TO THE PREVOUIS PAGE
       if (this.current_page_array_length == 1) {
         this.Current_page = this.Current_page - 1
         this.goToPreviousPage()
       }
     },
     error: (error: any) => { },
     complete: () => { this.FETCH_GENERAL_EXPENSE(); this.CANCEL_UPDATE(); }
   });
 }

 // ADD NEW GENERAL EXPENSE
 ADD_GENERAL_EXPENSE() {

console.log("ADDED",this.ADDED_GENERAL_EXPENSE)
   this.SHOW_LOADING_SPINNER = true;
   this.generalExpense.ADD_GENERAL_EXPENSE(this.ADDED_GENERAL_EXPENSE).subscribe({
     next: (response: any) => { },
     error: (error: any) => { },
     complete: () => { this.FETCH_GENERAL_EXPENSE(); this.CANCEL_UPDATE(); }
   });
 }

 DATA_CHANGED: boolean = false;
 // CONFIRM UPDATE
 UPDATE_GENERAL_EXPENSE() {
   this.SHOW_LOADING_SPINNER = true
   this.generalExpense.UPDATE_GENERAL_EXPENSE(this.ADDED_GENERAL_EXPENSE).subscribe({
     next: (response: any) => { },
     error: (error) => { },
     complete: () => { this.FETCH_GENERAL_EXPENSE(); this.CANCEL_UPDATE(); }
   });
 }

 // SELECT OBJECT TO UPDATE
 SELECTED_GENERAL_EXPENSE(obj: GeneralExpense): void {
   // SECURE THE ROUTE
   this.routeSignalService.show_pop_up_route.set(false)
   // HIDE ADD BUTTON AND SHOW THE UPDATE BUTTON
   this.ShowAddButoon = false
   this.CurrentAction = 'Update Visa';
   // OPEN THE PANEL 
   this.OPEN_PANEL();
   // FILL THE INPUTS WITH THE SELECTED OBJ VALUES
   this.ADDED_GENERAL_EXPENSE = { ...obj };
   this.MAIN_SELECTED_GENERAL_EXPENSE_DATA = obj;


 }

 // STATUS FILTERATION
 FILTER_ARRAY_BY_STATUS(val: any) {
   this.STATUS = val
   this.paginator.firstPage();
   this.FILTER_GENERAL_EXPENSE(this.SEARCK_KEY, this.FILTER_TYPE, this.START_DATE, this.END_DATE, val)
 }

 // DATE FILTERATION
 FILTER_ARRAY_BY_DATE(filter_type: any) {
   this.FILTER_TYPE = filter_type
   this.paginator.firstPage();
   this.FILTER_GENERAL_EXPENSE(this.SEARCK_KEY, filter_type, this.START_DATE, this.END_DATE, this.STATUS)
 }

 // FILTER BY SEARCH KEY
 APPLY_SEARCH_FILTER(searchValue: string): void {
   this.paginator.firstPage();
   this.SEARCK_KEY = searchValue
   this.FILTER_GENERAL_EXPENSE(searchValue, this.FILTER_TYPE, this.START_DATE, this.END_DATE, this.STATUS)
 }

 SEARCK_KEY = '';
 FILTER_TYPE = ''
 START_DATE = ''
 END_DATE = ''
 STATUS = ''
 FILTER_GENERAL_EXPENSE(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string) {
   this.generalExpense.FILTER_AND_SEARCH_GENERAL_EXPENSE(SEARCK_KEY, FILTER_TYPE, START_DATE, END_DATE, STATUS, this.Current_page, this.pageSize).subscribe({
     next: (response: any) => {
       this.current_page_array_length = response.expenses.length
       this.GeneralExpenseArray = new MatTableDataSource(response.expenses);
       // LENGTH : FOR PAGINATION 
       this.General_Expense_Array_length = response.pagination.totalExpenses;
     },
     error: (error) => { this.GeneralExpenseArray = new MatTableDataSource() },
     complete: () => { }
   });
 }

}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'general-expense-dialog-content',
  templateUrl: './general-expense-dialog-content/general-expense-dialog-content.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class GeneralExpenseDialogContentComponent {

  action: string;
  action_btn: string = 'Add'
  SHOW_LOADING_SPINNER: boolean = false;

  GENERAL_EXPENSE_SELECTED: any;


  constructor(
    public dialogRef: MatDialogRef<GeneralExpenseDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.GENERAL_EXPENSE_SELECTED = { ...data };
    this.action = data.action;

  }

  doAction(): void {
    this.SHOW_LOADING_SPINNER = true
      this.dialogRef.close({ event: this.action, data: this.GENERAL_EXPENSE_SELECTED });
  }

  CLOSE_DIALOG(event: string): void {
    this.dialogRef.close({ event: event });
  }

}





