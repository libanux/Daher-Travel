import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerClass } from 'src/app/classes/customer.class';
import { CustomerService } from 'src/app/services/Customer.service';
import { Month_Filter_Array } from 'src/app/services/general.service';

export interface PeriodicElement {
id: number;
uname: string;
position: string;
productName: string;
budget: number;
priority: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
{
  id: 1,
  uname: 'Sunil Joshi',
  position: 'Web Designer',
  productName: 'Elite Admin',
  budget: 3.9,
  priority: 'low',
},
{
  id: 2,
  uname: 'Andrew McDownland',
  position: 'Project Manager',
  productName: 'Real Homes Theme',
  budget: 24.5,
  priority: 'medium',
},
{
  id: 3,
  uname: 'Christopher Jamil',
  position: 'Project Manager',
  productName: 'MedicalPro Theme',
  budget: 12.8,
  priority: 'high',
}
];

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})

export class ViewCustomerComponent implements OnInit{

  VIEWED_CUSTOMER: CustomerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: '',
  }

  displayedColumns: string[] = [
    'select',
    'assigned',
    'name',
    'priority',
    'budget',
  ];

  months: any [] = Month_Filter_Array
  selectedMonth: string = '';

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  constructor(private customerService : CustomerService){}

  viewed_cutomer_ID = ''

  ngOnInit(): void {
    const viewed_customer_id_str = localStorage.getItem('viewed_cutomer_id');
    if (viewed_customer_id_str !== null) {
      this.viewed_cutomer_ID = viewed_customer_id_str; // Use unary plus (+) to convert string to number
    }

    this.GET_CUSTOMER_BY_ID(this.viewed_cutomer_ID)
  }

  
  showDatePicker = false;
  onChange(value: string, dropdown: string) {

    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        // this.FILTER_ARRAY_BY_DATE(value)
      }
    }

    else if (dropdown == 'status') {
      if (value == 'all') {
        // this.FETCH_VISA()
      }
      else {
        // this.FILTER_ARRAY_BY_STATUS(value)
      }
    }
  }

  GET_CUSTOMER_BY_ID(id: string){
    this.customerService.GET_CUSTOMER_BY_ID(id).subscribe({
      next: (response: any) => {this.VIEWED_CUSTOMER = response },
      error: (error) => { },
      complete: () => { }
    });
  }

  
  APPLY_SEARCH_FILTER(filterValue: string): void {
    // this.customerService.FILTER_BY_SEARCH_KEY(filterValue, 1, 10).subscribe({
    //   next: (response: any) => { 
    //     console.log(response); this.c = new MatTableDataSource(response.visas); 
    //   },
    //   error: (error) => { 
    //     console.log(error);
    //     this.VisaArray = new MatTableDataSource(); 
    //     this.no_visas_found = true
    //   },
    //   complete: () => { }
    // }); 
  }
}
