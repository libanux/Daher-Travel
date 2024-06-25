import { Component, Inject, Input, OnInit, Optional, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WholesalerClass } from 'src/app/classes/wholesaler.class';
import { Router } from '@angular/router';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import { CustomerDialogContentComponent } from '../customers/main-page/customers.component';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { Download_Options, GeneralService } from 'src/app/services/general.service';

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
  show_shimmer = true;
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
  WholesalerArray: any[] = []
  valueDisplayed = ''

  show_print_btn: boolean = false;

  pageSize = 10;
  WHOLESALER_Array_length = 0
  Current_page = 1

  Options: any[] = Download_Options;
  constructor(
    private routeSignalService: RouteSignalService,
    private router: Router, public dialog: MatDialog, private breadCrumbService: BreadCrumbSignalService, private wholesaler: WholesalerService,private generalService : GeneralService) {
    this.ADDED_WHOLESALER = new WholesalerClass()
    effect(() => (
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    ))
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Wholesalers')
    this.FETCH_WHOLESALERS();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.FETCH_WHOLESALERS()
  }

  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(CustomerDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {
        this.DELETE_WHOLESALER(obj._id);
      }
    });
  }

  DROPDOWN_FILTERATION(value: string, dropdown: string) {

     if (dropdown == 'Download') {
      this.DOWNLOAD(value);
    }
  }

  isAnyFieldNotEmpty = false; // Flag to track if any field has content
  onInputChange() {
    // Check only specific fields for content
    this.isAnyFieldNotEmpty = Object.values(this.ADDED_WHOLESALER).some(val => val !== '' && val !== null);

    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);
    }
  }

  APPLY_SEARCH_FILTER(): void {
    this.Current_page = 1;
    this.wholesaler.SEARCH_WHOLESALER(this.pageSize, this.Current_page, this.searchText).subscribe({
      next: (response: any) => {

        this.WholesalerArray = response.wholesalers;
        this.WHOLESALER_Array_length = response.pagination.totalWholesalers
      },
      error: (error: any) => {
        this.WholesalerArray = [];
        this.WHOLESALER_Array_length = 0;
        console.error("Error:", error)
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
    else {
      localStorage.setItem('viewed_wholesaler_id', element._id)
      this.VIEW_WHOLESALER()
    }
  }



  // GET ALL WHOLESALERS
  FETCH_WHOLESALERS() {
    this.wholesaler.GET_ALL_WHOLESALERS(this.Current_page).subscribe({
      next: (response: any) => {
        this.show_shimmer = false;
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
      },
      error: (error) => { },
      complete: () => { this.FETCH_WHOLESALERS(); this.CANCEL_UPDATE(); }
    });
  }

  // ADD
  ADD_CUSTOMER(obj: WholesalerClass) {
    this.wholesaler.ADD_WHOLESALER(obj).subscribe({
      next: (response: any) => {
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
    this.currentAction = "Update Wholesaler"
    this.ADDED_WHOLESALER = { ...obj };

    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  selectedDownloadOption: string = 'Download as';

  DOWNLOAD(OPTION: string) {
    this.generalService.getData('EXPORT_WHOLESALERS_TO_EXCEL')

  }


  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.ShowAddButoon = true;
    this.currentAction = "Add Wholesaler"
    this.open_expansion_value = -1;

    this.panelClosed()

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
export class DeleteWholesalerDialogContentComponent {
  action: string;
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };

  LABOR_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteWholesalerDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WholesalerClass,
  ) {
    this.LABOR_SELECTED = { ...data };
    this.action = this.LABOR_SELECTED.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.LABOR_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}


