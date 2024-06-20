import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GeneralService } from 'src/app/services/general.service';
import { months } from 'src/app/classes/DateDropdownData';


// Define an interface for the header object
interface Header {
  name: string;
}

// Define the headers as an array of Header objects
const headers: Header[] = [
  { name: 'Cost' },
  { name: 'Expenses' },
  { name: 'NetProfit' },
];

const tableData: any[] = [
  { category: 'Pack', cost: '$40.00', expenses: '$80.00', netprofit: '$40.00' },
  { category: 'Visa', cost: '$30.00', expenses: '$3,000.00', netprofit: '$3,000.00' },
  { category: 'Tichstag', cost: '$10,000.00', expenses: '$20,000.00', netprofit: '¥100.70' },
  { category: 'Total', cost: '$14,070.00', expenses: '$31,000.00', netprofit: '$3,000.70' },
];


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
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
export class ReportsComponent implements OnInit {

  ShowAddButoon = true;
  selectedMonth: string = '';

headers: any [] = headers
TableData : any [] = tableData
  //TABLE COLUMNS
  displayedColumns: string[] = [
    'barcode',
    'itemName',
    'category',
    'previousQuantity',
    'onHandQuantity',
    'action'
  ];
  InventoryColumn: string[] = [
    'barcode',
    'item',
    'quantity',
    'cost',
    'totalCost',
    'price'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: any | null = null;

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
  months: any[] = months

 //MAIN stock ARRAY
 showCalendar: boolean = false;
 selectedDate: Date | null = null; // Adjusted the type to accept null
//stockS ARRAY
stocksArray = new MatTableDataSource<any>([]);
categoryArray: any [] =[]
InventoryArray = new MatTableDataSource<any>(
  [
    { 
      barcode: '9789953000489',
      item: 'Baklava',
      quantity: 100,
      cost: 15.99,
      totalCost: 1599,
      price: 19.99
  },
  {
      barcode: '9789953000496',
      item: 'Karak Tea',
      quantity: 80,
      cost: 3.99,
      totalCost: 319.2,
      price: 5.99
  }, { 
    barcode: '9789953000489',
    item: 'Baklava',
    quantity: 100,
    cost: 15.99,
    totalCost: 1599,
    price: 19.99
},
{
    barcode: '9789953000496',
    item: 'Karak Tea',
    quantity: 80,
    cost: 3.99,
    totalCost: 319.2,
    price: 5.99
},
  ]);

constructor(public generalService: GeneralService, public dialog: MatDialog) {

}

ngOnInit(): void {
}

}