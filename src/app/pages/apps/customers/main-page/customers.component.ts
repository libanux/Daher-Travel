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
import { SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  months: month[] = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'Last Month', viewValue: 'Last Month' },
    { value: 'Last Year', viewValue: 'Last Year' },
    { value: 'Calendar', viewValue: 'Custom' }
  ];

  rangeStart = signal('');
  rangeEnd = signal('');
  ShowAddButoon = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;
  selectedMonth: string = '';
  selectedStatusFilteraTION: string = '';

  displayedColumns: string[] = [
    'select',
    'Name',
    'Phone-Number',
    'Address',
  ];

  ADDED_CUSTOMER: CustomerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: '',
  }

Filteration: month[] = [
  { value: 'all', viewValue: 'All' },
  { value: 'rejected', viewValue: 'Rejected' },
  { value: 'approved', viewValue: 'Approved' },
  { value: 'pending', viewValue: 'Pending' },
];
  // CustomersArray : CUSTOMERClass [] = []

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: CustomerClass | null = null;
  CustomersArray = new MatTableDataSource();
  valueDisplayed = ''

show_print_btn: boolean = false;
selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.CustomersArray.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.CustomersArray.data.forEach((row: any) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      this.show_print_btn = true;
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  
  constructor(private router: Router,public dialog: MatDialog, private dateSignal: DateSelectedSignal, private customerService: CustomerService) {
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


  ngAfterViewInit(): void {
    this.CustomersArray.paginator = this.paginator;
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.CustomersArray.filter = filterValue.trim().toLowerCase();
  }

  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.CustomersArray.filter = val.trim().toLowerCase();
  }

  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

  showDatePicker = false;
  onChange(value: string, dropdown: string) {

    if(dropdown == 'month'){
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }
  
      else {
        this.showDatePicker = false;
      }
    }

    else if (dropdown == 'status'){
      if(value == 'all'){
        this.FETCH_CUSTOMER()
      }
      else{
        this.FILTER_ARRAY_BY_STATUS(value)
      }
    }
}

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  VIEW_CUSTOMER(): void {
    this.router.navigate(['apps/customers/view']).then(() => {
      window.scrollTo(0, 0);
    });
  }



  // ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE 

    // GET ALL CUSTOMER'S 
    FETCH_CUSTOMER() {
      this.customerService.GET_ALL_CUSTOMER().subscribe({
        next: (response: any) =>{this.CustomersArray = new MatTableDataSource(response.customers);},
        error: (error) => { },
        complete: () => {}
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
    console.log(obj)
    this.customerService.ADD_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.CANCEL_UPDATE(); this.FETCH_CUSTOMER();}
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
  SELECTED_CUSTOMER(obj: any): void {
    this.ShowAddButoon = false

    this.ADDED_CUSTOMER = {
      _id: obj._id,
      name: obj.name,
      phoneNumber: obj.phoneNumber,
      address: obj.address
    }

  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true
    this.ADDED_CUSTOMER = {
      _id: '',
      name: '',
      phoneNumber: '',
      address: '',
    }
  }

}