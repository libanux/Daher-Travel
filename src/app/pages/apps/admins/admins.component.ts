import { Component, ViewChild, AfterViewInit, Inject, Optional, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/Admins.service';
import { Admin, PERMISSIONS } from 'src/app/classes/admin.class';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  templateUrl: './admins.component.html',
  styleUrl: 'admins.component.scss'
})
export class AdminsComponent implements AfterViewInit, OnInit {

  admins: Admin[] = [];

 ADDED_ADMIN: Admin = {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    permissions: {
        packages: 'write',
        visa: 'write',
        recruitment: 'write',
        accounting: 'write',
        users: 'write',
        notes: 'write'
    },
    token: ''
};

show_shimmer = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'action'
  ];

  dataSource = new MatTableDataSource(this.admins);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  columnsToDisplayWithExpand = [...this.displayedColumns];

  constructor(private breadCrumbService:BreadCrumbSignalService ,public dialog: MatDialog, public datePipe: DatePipe, private adminService: AdminService) { }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Admins')
    this.FETCH_ADMINS()
    this.dataSource = new MatTableDataSource(this.admins);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  FETCH_ADMINS() {
    this.show_shimmer = true
    this.adminService.GET_ALL_ADMINS().subscribe({
      next: (response: any) => {this.admins = response },
      error: (error) => { },
      complete: () => {     this.show_shimmer = false }
    });
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OPEN_DIALOG(action: string, obj: any): void {

    this.ADDED_ADMIN = {
      _id: obj._id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      phone: obj.phone,
      password: obj.password,
      permissions: {
          packages: obj.packages,
          visa: obj.visa,
          recruitment: obj.recruitment,
          accounting: obj.accounting,
          users: obj.users,
          notes:obj.notes,
      },
      token: '',
    }

    obj.action = action;

    const dialogRef = this.dialog.open(AdminDialogContentComponent, {
      data: obj,
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.ADD_ADMIN(result.data);
      } 
      else if (result.event === 'Update') {
        this.UPDATE_ADMIN(result.data);
      } 
      else if (result.event === 'Delete') {
        this.DELETE_ADMIN(result.data);
      }
    });
  }

  ADD_ADMIN(object: Admin): void {
    this.adminService.ADD_ADMIN(object).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_ADMINS(); }
    });
  }

  UPDATE_ADMIN(row_obj: Admin): void {
    this.table.renderRows();
  }

  DELETE_ADMIN(ID: string): void {
    this.adminService.DELETE_ADMIN(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_ADMINS(); }
    });
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



}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './admin-dialog-content/admin-dialog-content.component.html',
  styleUrl: './admin-dialog-content/admin-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class AdminDialogContentComponent{
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };

  selectedPermission: string = '';
  permissions: any = PERMISSIONS
  
  SELECTED_ADMIN_PERMISSIONS = {
    accounting: {'Read': null, 'Write': null},
    notes: {'Read': null, 'Write': null},
    packages: {'Read': null, 'Write': null},
    recruitment: {'Read': null, 'Write': null},
    users: {'Read': null, 'Write': null},
    visa: {'Read': null, 'Write': null},
  }

  action: string;
  ADMIN_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Admin,
  ) 
  {
    this.ADMIN_SELECTED = { ...data };
    this.action = this.ADMIN_SELECTED.action;

 this.SELECTED_ADMIN_PERMISSIONS = {
  accounting: {'Read': null, 'Write': null},
  notes: {'Read': null, 'Write': null},
  packages:     {'Read': null, 'Write': null},
  recruitment: {'Read': null, 'Write': null},
  users: {'Read': null, 'Write': null},
  visa: {'Read': null, 'Write': null},
  }
  
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.ADMIN_SELECTED });
  }

  ADD(){
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  toggleSubPermissions(permission: string) {
    if (this.selectedPermission === permission) {
      this.selectedPermission = ''; // If the same permission is clicked again, close it
    } else {
      this.selectedPermission = permission; // Otherwise, set the selected permission
    }
  }

  checkParent(permission: string) {
    if (permission === 'package') {
      if (this.package.read || this.package.write) {
        this.package.selected = true;
      } else {
        this.package.selected = false;
      }
      if (this.package.write) {
        this.package.read = true; // Automatically select "Read" when "Write" is selected
      }
    } else if (permission === 'visa') {
      if (this.visa.read || this.visa.write) {
        this.visa.selected = true;
      } else {
        this.visa.selected = false;
      }
      if (this.visa.write) {
        this.visa.read = true; // Automatically select "Read" when "Write" is selected
      }
    }
    // Add similar logic for other permissions
  }


}
