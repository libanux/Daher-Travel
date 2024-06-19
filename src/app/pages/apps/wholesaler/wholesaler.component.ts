import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { PagingService } from 'src/app/signals/paging.service';
import { Router } from '@angular/router';
import { WholesalerService } from 'src/app/services/wholesaler.service';

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler.component.html',
  styleUrl: './wholesaler.component.scss',
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

export class WholesalerComponent implements OnInit {
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
    'email',
    'company',
    'address',
    'action',
  ];

  ADDED_WHOLESALER: WholesalerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    company: ''
  }

  expandedElement: WholesalerClass | null = null;
  columnsToDisplayWithExpand = [...this.displayedColumns];

  currentAction: string = "Add Wholesaler"
  WholesalerArray = new MatTableDataSource();
  valueDisplayed = ''

  show_print_btn: boolean = false;

  pageSize = 10;
  WHOLESALER_Array_length = 0
  Current_page = 1


  constructor(private paginagservice: PagingService, private router: Router, public dialog: MatDialog, private dateSignal: DateSelectedSignal, private wholesaler: WholesalerService) {
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    ))
  }

  ngOnInit(): void {
    this.rangeEnd = this.dateSignal.endDate;
    this.rangeStart = this.dateSignal.startDate;
    this.FETCH_WHOLESALERS();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.paginagservice.pageSize.set(event.pageSize)
    this.paginagservice.currentPage.set(event.pageIndex)
    this.FETCH_WHOLESALERS()
  }

  OPEN_DIALOG(action: string, obj: any): void {
    // obj.action = action;

    // const dialogRef = this.dialog.open(CustomerDialogContentComponent, {
    //   data: obj,
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result.event === 'delete') {       
    //     console.log(obj)
    //     this.DELETE_CUSTOMER(obj._id);
    //   }
    // });
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
  FETCH_WHOLESALERS() {
    this.wholesaler.GET_ALL_WHOLESALERS(this.Current_page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.WholesalerArray = new MatTableDataSource(response.wholesalers);
        this.WHOLESALER_Array_length = response.pagination.totalWholesalers
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  // DELETE 
  DELETE_CUSTOMER(ID: number): void {
    this.wholesaler.DELETE_CUSTOMER(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_WHOLESALERS(); this.CANCEL_UPDATE(); }
    });
  }

  // ADD
  ADD_CUSTOMER(obj: WholesalerClass) {
    console.log(obj)
    this.wholesaler.ADD_WHOLESALER(obj).subscribe({
      next: (response: any) => { 
        console.log(response)
      },
      error: (error) => { },
      complete: () => { this.CANCEL_UPDATE(); this.FETCH_WHOLESALERS(); }
    });
  }

  // CONFIRM UPDATE
  UPDATE_CUSTOMER(obj: WholesalerClass): void {
    this.wholesaler.UPDATE_CUSTOMER(obj).subscribe({
      next: (response: any) => { },
      error: (error: any) => {
        console.log("error", error)
      },
      complete: () => {
        this.CANCEL_UPDATE();
        this.FETCH_WHOLESALERS();
      }
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_CUSTOMER(obj: WholesalerClass): void {
    this.ShowAddButoon = false;
    this.currentAction = "Update Customer"
    this.ADDED_WHOLESALER = obj
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true;
    this.currentAction = "Add Customer"

    this.ADDED_WHOLESALER = {
      _id: '',
      name: '',
      phoneNumber: '',
      address: '',
      email: '',
      company: ''
    }
  }

}






// @Component({
//   // tslint:disable-next-line: component-selector
//   selector: 'app-dialog-content',
//   templateUrl: '../customers-dialog-content/customers-dialog-content.component.html',
//   styleUrl: '../customers-dialog-content/customers-dialog-content.component.scss'
// })
// // tslint:disable-next-line: component-class-suffix
// export class CustomerDialogContentComponent{
//   package = { selected: false, read: false, write: false };
//   visa = { selected: false, read: false, write: false };


//   action: string;
//   CUSTOMER_SELECTED: any;

//   constructor(
//     public dialogRef: MatDialogRef<CustomerDialogContentComponent>,
//     @Optional() @Inject(MAT_DIALOG_DATA) public data: WholesalerClass,
//   )
//   {
//     this.CUSTOMER_SELECTED = { ...data };
//     this.action = this.CUSTOMER_SELECTED.action;
//     console.log(this.CUSTOMER_SELECTED)
//   }

//   doAction(): void {
//     console.log(this.CUSTOMER_SELECTED)
//     this.dialogRef.close({ event: this.action, data: this.CUSTOMER_SELECTED });
//   }

//   CLOSE_DIALOG(): void {
//     this.dialogRef.close({ event: 'Cancel' });
//   }

// }
