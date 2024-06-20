import { Component, Inject, OnInit, Optional, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from 'src/app/services/Customer.service';
import { CustomerClass } from 'src/app/classes/customer.class';
import { Router } from '@angular/router';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [
     '../../../../../assets/scss/apps/_add_expand.scss',
     '../../../../../assets/scss/apps/general_table.scss'
    ],
})

export class CustomersComponent implements OnInit {
   // 1 basic
   panelOpenState = false;
   open_expansion_value = 0;

 show_shimmer = true;

  rangeStart = signal('');
  rangeEnd = signal('');
  ShowAddButoon = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;
  selectedMonth: string = '';

  displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'address',
    'action',
  ];

  ADDED_CUSTOMER: CustomerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: ''
  }

  expandedElement: CustomerClass | null = null;
  columnsToDisplayWithExpand = [...this.displayedColumns];

  currentAction: string = "Add Customer"
  CustomersArray = new MatTableDataSource();
  valueDisplayed = ''

  show_print_btn: boolean = false;

  pageSize = 10;
  CUSTOMERS_Array_length = 0
  Current_page = 1


  constructor(private breadCrumbService: BreadCrumbSignalService ,private router: Router, public dialog: MatDialog, private customerService: CustomerService) {
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    ))
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Customers')
    this.FETCH_CUSTOMER();
  }
  
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;

    this.FETCH_CUSTOMER()
  }

  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(CustomerDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {       
        this.DELETE_CUSTOMER(obj._id);
      }
    });
  }




  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    // this.CustomersArray.filter = val.trim().toLowerCase();
  }

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  VIEW_CUSTOMER(): void {
    this.router.navigate(['apps/customers/view']).then(() => {
      window.scrollTo(0, 0);
    });
  }


  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  ROW_CLICK(element: CustomerClass, column: string): void {
    if (column === 'action') { this.expandedElement = element; }
    else
     { 
      localStorage.setItem('viewed_cutomer_id', element._id)
      this.VIEW_CUSTOMER()
     }
  }

// ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE 


  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.show_shimmer = true;

    this.customerService.GET_ALL_CUSTOMER(this.Current_page).subscribe({
      next: (response: any) => {
        this.CustomersArray = new MatTableDataSource(response.customers); 
       this.CUSTOMERS_Array_length = response.pagination.totalCustomers
      },
      error: (error) => {  },
      complete: () => {
        this.CANCEL_UPDATE();     
        this.show_shimmer = false;
      }
    });
  }

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
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {this.FETCH_CUSTOMER(); }
    });
  }

  // CONFIRM UPDATE
  UPDATE_CUSTOMER(obj: CustomerClass): void {
    this.customerService.UPDATE_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {this.FETCH_CUSTOMER();}
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_CUSTOMER(obj: CustomerClass): void {
    this.ShowAddButoon = false;
    this.currentAction = "Update Customer";
    this.ADDED_CUSTOMER = obj;
    this.open_expansion_value = 1;
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true;
    this.currentAction = "Add Customer"
    this.open_expansion_value = -1;

    this.ADDED_CUSTOMER = {
      _id: '',
      name: '',
      phoneNumber: '',
      address: '',
    }
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {  
    this.customerService.FILTER_BY_SEARCH_KEY(filterValue, this.Current_page, this.pageSize).subscribe({
      next: (response: any) => { this.CustomersArray = new MatTableDataSource(response.customers); },
      error: (error) => { this.CustomersArray = new MatTableDataSource() },
      complete: () => { }
    });   }

}






@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: '../customers-dialog-content/customers-dialog-content.component.html',
  styleUrl: '../customers-dialog-content/customers-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class CustomerDialogContentComponent{
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  CUSTOMER_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CustomerClass,
  ) 
  {
    this.CUSTOMER_SELECTED = { ...data };
    this.action = this.CUSTOMER_SELECTED.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.CUSTOMER_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
