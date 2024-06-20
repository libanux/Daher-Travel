import { Component, Inject, Input, OnInit, Optional, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { PagingService } from 'src/app/signals/paging.service';
import { Router } from '@angular/router';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import { CustomerDialogContentComponent } from '../customers/main-page/customers.component';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

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

  @Input() showAddSection = true;

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

    // 1 basic
    panelOpenState = false;
    open_expansion_value = 0;

  ADDED_WHOLESALER: WholesalerClass 

  expandedElement: WholesalerClass | null = null;
  columnsToDisplayWithExpand = [...this.displayedColumns];

  currentAction: string = "Add Wholesaler"
  WholesalerArray :any[] = []
  valueDisplayed = ''

  show_print_btn: boolean = false;

  pageSize = 10;
  WHOLESALER_Array_length = 0
  Current_page = 1


  constructor(private paginagservice: PagingService, private router: Router, public dialog: MatDialog,private breadCrumbService :BreadCrumbSignalService, private dateSignal: DateSelectedSignal, private wholesaler: WholesalerService) {
    this.ADDED_WHOLESALER = new WholesalerClass()
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    ))
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Wholesalers')
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
    obj.action = action;

    const dialogRef = this.dialog.open(CustomerDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {       
        console.log(obj)
        this.DELETE_WHOLESALER(obj._id);
      }
    });
  }


  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.Current_page = 1;
    this.wholesaler.SEARCH_WHOLESALER(this.pageSize, this.Current_page, filterValue).subscribe({
      next: (response: any) => {

        this.WholesalerArray = response.wholesalers;
        this.WHOLESALER_Array_length = response.pagination.totalWholesalers
      },
      error: (error: any) => {
        this.WholesalerArray = [];
        this.WHOLESALER_Array_length=0;
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }

  //STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    // this.CustomersArray.filter = val.trim().toLowerCase();
  }

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  VIEW_WHOLESALER(): void {
    this.router.navigate(['apps/wholesaler/view']).then(() => {
      window.scrollTo(0, 0);
    });
  }


  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  ROW_CLICK(element: any, column: string): void {
    if (column === 'action') { this.expandedElement = element; }
    else
     { 
      localStorage.setItem('viewed_wholesaler_id', element._id)
      this.VIEW_WHOLESALER()
     }
  }



  // GET ALL CUSTOMER'S 
  FETCH_WHOLESALERS() {
    this.wholesaler.GET_ALL_WHOLESALERS(this.Current_page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.WholesalerArray = response.wholesalers
        this.WHOLESALER_Array_length = response.pagination.totalWholesalers
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  // DELETE 
  DELETE_WHOLESALER(ID: number): void {
    this.wholesaler.DELETE_WHOLESALER(ID).subscribe({
      next: (response: any) => { 
        console.log(response)
      },
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
  UPDATE_WHOLESALER(obj: WholesalerClass): void {
    this.wholesaler.UPDATE_WHOLESALER(obj).subscribe({
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
  SELECTED_WHOLESALER(obj: WholesalerClass): void {
    this.ShowAddButoon = false;
    this.open_expansion_value = 1 ;
    this.currentAction = "Update Customer"
    this.ADDED_WHOLESALER = obj
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true;
    this.currentAction = "Add Customer"
    this.open_expansion_value = -1 ;
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


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-deleteWholesaler-dialog-content',
  templateUrl: './wholesaler-dialog-content.html',
  styleUrl: './wholesalers-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class DeleteWholesalerDialogContentComponent{
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  wholesaler: WholesalerClass

  constructor(
    public dialogRef: MatDialogRef<DeleteWholesalerDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WholesalerClass
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}


