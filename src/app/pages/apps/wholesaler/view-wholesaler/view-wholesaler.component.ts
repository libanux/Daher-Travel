import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerClass } from 'src/app/classes/customer.class';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { Month_Filter_Array } from 'src/app/services/general.service';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
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
  selector: 'app-view-wholesaler',
  templateUrl: './view-wholesaler.component.html',
  styleUrl: './view-wholesaler.component.scss'
})
export class ViewWholesalerComponent {


  VIEWED_WHOLESALER: WholesalerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: '',
    company:'',
    email:''
  }
  months: any [] = Month_Filter_Array
  showDatePicker = false;

  displayedColumns: string[] = [
    'select',
    'assigned',
    'name',
    'priority',
    'budget',
  ];
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

  constructor(private wholesalerService : WholesalerService, private breadCrumbService : BreadCrumbSignalService){}

  viewed_cutomer_ID = ''

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Wholesaler/View')
    const viewed_customer_id_str = localStorage.getItem('viewed_wholesaler_id');
    if (viewed_customer_id_str !== null) {
      this.viewed_cutomer_ID = viewed_customer_id_str; // Use unary plus (+) to convert string to number
    }

    this.GET_CUSTOMER_BY_ID(this.viewed_cutomer_ID)
  }

  GET_CUSTOMER_BY_ID(id: string){
    this.wholesalerService.GET_WHOLESALER_BY_ID(id).subscribe({
      next: (response: any) => {this.VIEWED_WHOLESALER = response },
      error: (error) => { },
      complete: () => { }
    });
  }
}