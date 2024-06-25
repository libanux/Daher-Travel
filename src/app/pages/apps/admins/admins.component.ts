import { Component, ViewChild, AfterViewInit, Inject, Optional, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/Admins.service';
import { Admin, Permissions_Array } from 'src/app/classes/admin.class';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { GeneralService } from 'src/app/services/general.service';
import { RouteSignalService } from 'src/app/signals/route.signal';

@Component({
  templateUrl: './admins.component.html',
  styleUrls: ['admins.component.scss', '../../../../assets/scss/apps/_add_expand.scss']
})
export class AdminsComponent implements OnInit {
  
  SHOW_LOADING_SPINNER: boolean = false;

  ADDED_ADMIN: Admin = {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    permissions: {
      packages: '',
      visa: '',
      recruitment: '',
      accounting: '',
      users: '',
      notes: ''
    },
    token: ''
  };

  permissions: any[] = Permissions_Array

  // These two valus are used for the add expnad row in the top of the page
  panelOpenState = false;
  open_expansion_value = 0;
  CurrentAction = 'Add Admin'

  // TABLE SHIMMER
  show_shimmer = true;
  ROWS_COUNT_SHIMMER: any[] = ['1', '2', '3', '4'];

  pageSize = 10;
  Current_page = 1
  admins_Array_length = 0

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'action'
  ];

  ADMINS_ARRAY = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  columnsToDisplayWithExpand = [...this.displayedColumns];

  constructor(
    private routeSignalService: RouteSignalService,
    private generalService: GeneralService, private breadCrumbService: BreadCrumbSignalService, public dialog: MatDialog, public datePipe: DatePipe, private adminService: AdminService) { }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Admins')
    this.pageSize = this.generalService.PageSizing
    this.FETCH_ADMINS()
  }

  // function when page number changes
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.FETCH_ADMINS();
  }


  isAnyFieldNotEmpty = false; // Flag to track if any field has content
  // Function to log input changes
  onInputChange() {
    // Check only specific fields for content
    this.isAnyFieldNotEmpty = Object.values(this.ADDED_ADMIN).some(val => val !== '' && val !== null);

    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);
    }
  }

  FETCH_ADMINS() {
    this.show_shimmer = true
    this.adminService.GET_ALL_ADMINS(this.Current_page, this.pageSize).subscribe({
      next: (response: any) => {
        this.ADMINS_ARRAY = new MatTableDataSource(response.admins);
        this.admins_Array_length = response.pagination.totalAdmins;
        this.ROWS_COUNT_SHIMMER = this.GENERATE_SHIMMER_ROWS_COUNT(response.pagination.totalAdmins)
      },
      error: (error) => { },
      complete: () => { this.show_shimmer = false }
    });
  }

  GENERATE_SHIMMER_ROWS_COUNT(count: number): string[] {
    return this.generalService.GENERATE_SHIMMER_ROWS_COUNT(count)
  }

  APPLY_SEARCH_FILTER(SEARCH_VALUE: string): void {
    this.adminService.SEARCH_ADMIN(SEARCH_VALUE).subscribe({
      next: (response: any) => {
        this.ADMINS_ARRAY = new MatTableDataSource(response);
        this.admins_Array_length = response.length;
        this.ROWS_COUNT_SHIMMER = this.GENERATE_SHIMMER_ROWS_COUNT(response.length)
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  OPEN_DIALOG(action: string, obj: any): void {

    this.ADDED_ADMIN = obj
    obj.action = action;

    const dialogRef = this.dialog.open(AdminDialogContentComponent, {
      data: obj,
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.DELETE_ADMIN(result.data);
      }
    });
  }

  ADD_ADMIN(object: Admin): void {
  this.SHOW_LOADING_SPINNER = true
   this.adminService.ADD_ADMIN(object).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_ADMINS(); this.CANCEL_UPDATE()}
    });
  }

  UPDATE_ADMIN(): void {
    this.SHOW_LOADING_SPINNER = true
    this.adminService.UPDATE_ADMIN(this.ADDED_ADMIN).subscribe({
      next: (response: any) => { },
      error: (error) => { console.error(error)},
      complete: () => { this.FETCH_ADMINS(); this.CANCEL_UPDATE()}
    });
  }

  DELETE_ADMIN(ID: string): void {
    this.adminService.DELETE_ADMIN(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { console.error(error) },
      complete: () => { this.FETCH_ADMINS(); }
    });
  }


  ShowAddButoon = true;

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.CurrentAction = 'Add Admin';
    this.ShowAddButoon = true;
    // this.routeSignalService.show_pop_up_route.set(false)

    this.SHOW_LOADING_SPINNER = false

    // CLOSE THE PANEL
    this.CLOSE_PANEL()

    this.ADDED_ADMIN = {
      _id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      permissions: {
        packages: '',
        visa: '',
        recruitment: '',
        accounting: '',
        users: '',
        notes: ''
      },
      token: ''
    }
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_ADMIN(obj: Admin): void {
    // SECURE THE ROUTE
    // this.routeSignalService.show_pop_up_route.set(false)
    // HIDE ADD BUTTON AND SHOW THE UPDATE BUTTON
    this.ShowAddButoon = false
    this.CurrentAction = 'Update Admin';
    // OPEN THE PANEL 
    this.OPEN_PANEL();
    // FILL THE INPUTS WITH THE SELECTED OBJ VALUES
    this.ADDED_ADMIN = { ...obj };
  }

  expandedElement: Admin | null = null;
  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  EXPAND_ROW(event: Event, element: any, column: string): void {
    if (column === 'action') {
      this.expandedElement = element;
    }
    else {
      this.expandedElement = this.expandedElement === element ? null : element;
      event.stopPropagation();
    }
  }

  CLOSE_PANEL() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  OPEN_PANEL() {
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }

}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './admin-dialog-content/admin-dialog-content.component.html',
  styleUrl: './admin-dialog-content/admin-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class AdminDialogContentComponent {
  SHOW_LOADING_SPINNER: boolean = false
  action: string;
  ADMIN_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Admin,
  ) {
    this.ADMIN_SELECTED = { ...data };
    this.action = this.ADMIN_SELECTED.action;
  }

  doAction(): void {
    this.SHOW_LOADING_SPINNER = true
    this.dialogRef.close({ event: this.action, data: this.ADMIN_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
