import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { months } from 'src/app/classes/DateDropdownData';




// Define the headers as an array of Header objects
const headers: any[] = [
  'category',
   'Cost' ,
   'Expenses' ,
   'NetProfit' ,
];

const tableData: any[] = [
  { category: 'Pack', Cost: '$40.00', Expenses: '$80.00', NetProfit: '$40.00' },
  { category: 'Visa', Cost: '$30.00', Expenses: '$3,000.00', NetProfit: '$3,000.00' },
  { category: 'Ticketing', Cost: '$10,000.00', Expenses: '$20,000.00', NetProfit: '¥100.70' },
  { category: 'Total', Cost: '$14,070.00', Expenses: '$31,000.00', NetProfit: '$3,000.70' },
];

const Categories : any [] = ['All', 'Pack','Visa', 'Ticketing']


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls:[ './reports.component.scss','../../../../assets/scss/apps/general_table.scss',]
})
export class ReportsComponent implements OnInit {

  ShowAddButoon = true;
  selectedMonth: string = '';
  months: any[] = Month_Filter_Array

TableData = new MatTableDataSource(tableData);
headers: any [] = headers;
Categories : any [] = Categories
// TableData : any [] = tableData
  //TABLE COLUMNS
  // displayedColumns: string[] = [
  //   'barcode',
  //   'itemName',
  //   'category',
  //   'previousQuantity',
  //   'onHandQuantity',
  //   'action'
  // ];
  // InventoryColumn: string[] = [
  //   'barcode',
  //   'item',
  //   'quantity',
  //   'cost',
  //   'totalCost',
  //   'price'
  // ];
  // columnsToDisplayWithExpand = [...this.displayedColumns];
  // expandedElement: any | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  // 
  selectedCategory: string = '';
  searchText: any;
  totalCount = 0;
  Cancelled = 0;
  Inprogress = 0;
  Completed = 0;

  // categoryArray = categories
  Inventories: any = [

  ] 

  //MONTHS FOR FILTER DROPDOWN
 showCalendar: boolean = false;
 selectedDate: Date | null = null; // Adjusted the type to accept null
//stockS ARRAY
stocksArray = new MatTableDataSource<any>([]);
categoryArray: any [] =[]
// InventoryArray = new MatTableDataSource<any>(
//   [
//     { 
//       barcode: '9789953000489',
//       item: 'Baklava',
//       quantity: 100,
//       cost: 15.99,
//       totalCost: 1599,
//       price: 19.99
//   },
//   {
//       barcode: '9789953000496',
//       item: 'Karak Tea',
//       quantity: 80,
//       cost: 3.99,
//       totalCost: 319.2,
//       price: 5.99
//   }, { 
//     barcode: '9789953000489',
//     item: 'Baklava',
//     quantity: 100,
//     cost: 15.99,
//     totalCost: 1599,
//     price: 19.99
// },
// {
//     barcode: '9789953000496',
//     item: 'Karak Tea',
//     quantity: 80,
//     cost: 3.99,
//     totalCost: 319.2,
//     price: 5.99
// },
//   ]);

constructor(public generalService: GeneralService, public dialog: MatDialog) {

}

ngOnInit(): void {
}

}