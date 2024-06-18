import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerClass } from 'src/app/classes/customer.class';

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

export class ViewCustomerComponent {

  VIEWED_CUSTOMER: CustomerClass = {
    _id: '',
    name: 'Nancy',
    phoneNumber: '546545',
    address: 'Nabatieh',
  }

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

  constructor(){}

}
