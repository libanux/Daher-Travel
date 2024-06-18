import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { CustomerService } from 'src/app/services/Customer.service';
import { CustomerClass } from 'src/app/classes/customer.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})

export class CustomersComponent implements OnInit {

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

  constructor(private router: Router, public dialog: MatDialog, private dateSignal: DateSelectedSignal, private customerService: CustomerService) {
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

  APPLY_SEARCH_FILTER(filterValue: string): void {
    // this.CustomersArray.filter = filterValue.trim().toLowerCase();
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
  ROW_CLICK(element: any, column: string): void {
    if (column === 'action') { this.expandedElement = element; }
    else { this.VIEW_CUSTOMER() }
  }


  // ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE 

  // GET ALL CUSTOMER'S 
  FETCH_CUSTOMER() {
    this.customerService.GET_ALL_CUSTOMER().subscribe({
      next: (response: any) => { this.CustomersArray = new MatTableDataSource(response.customers); },
      error: (error) => { },
      complete: () => { }
    });
  }

  // DELETE 
  DELETE_CUSTOMER(ID: number): void {
    this.customerService.DELETE_CUSTOMER(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_CUSTOMER(); this.CANCEL_UPDATE(); }
    });
  }

  // ADD
  ADD_CUSTOMER(obj: CustomerClass) {
    console.log(obj)
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.CANCEL_UPDATE(); this.FETCH_CUSTOMER(); }
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
  SELECTED_CUSTOMER(obj: CustomerClass): void {
    this.ShowAddButoon = false;
    this.currentAction = "Update Customer"
    this.ADDED_CUSTOMER = obj
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true;
    this.currentAction = "Add Customer"

    this.ADDED_CUSTOMER = {
      _id: '',
      name: '',
      phoneNumber: '',
      address: '',
    }
  }

}