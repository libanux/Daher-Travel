import { Component, ViewChild, AfterViewInit, Inject, Optional, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/Admins.service';
import { Admin, PERMISSIONS } from 'src/app/classes/admin.class';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { Permission } from 'src/app/classes/adminPermissions.class';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: './admins.component.html',
  styleUrl: 'admins.component.scss'
})
export class AdminsComponent implements OnInit {

  // admins: Admin[] = [];

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

pageSize = 10;
Current_page = 1
admins_Array_length = 0

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;

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

  constructor(private generalService: GeneralService,private breadCrumbService:BreadCrumbSignalService ,public dialog: MatDialog, public datePipe: DatePipe, private adminService: AdminService) { }

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

  FETCH_ADMINS() {
    this.show_shimmer = true
    this.adminService.GET_ALL_ADMINS(this.Current_page, this.pageSize).subscribe({
      next: (response: any) => {
        console.log(response)
        this.ADMINS_ARRAY = new MatTableDataSource(response.admins);
        this.admins_Array_length = response.pagination.totalAdmins;
      },
      error: (error) => { },
      complete: () => { this.show_shimmer = false }
    });
  }

  APPLY_SEARCH_FILTER(filterValue: string): void {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OPEN_DIALOG(action: string, obj: any): void {

    this.ADDED_ADMIN = obj
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

    console.log(object)
    // this.adminService.ADD_ADMIN(object).subscribe({
    //   next: (response: any) => { },
    //   error: (error) => { },
    //   complete: () => { this.FETCH_ADMINS(); }
    // });
  }

  UPDATE_ADMIN(obj: Admin): void {
    this.adminService.UPDATE_ADMIN(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { console.error(error)},
      complete: () => { this.FETCH_ADMINS(); }
    });
  }

  DELETE_ADMIN(ID: string): void {
    this.adminService.DELETE_ADMIN(ID).subscribe({
      next: (response: any) => { },
      error: (error) => { console.error(error)},
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
  packages: {'Read': null, 'Write': null},
  recruitment: {'Read': null, 'Write': null},
  users: {'Read': null, 'Write': null},
  visa: {'Read': null, 'Write': null},
  }
  
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.ADMIN_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }


    // Method to update all subtasks completion status
    updateAllComplete(permission: Permission): void {
      permission.subtasks.forEach((subtask: any) => subtask.completed = permission.completed);
    }
  
    // Method to check if some subtasks are completed
    someComplete(permission: Permission): boolean {
      return permission.subtasks.some((subtask: any) => subtask.completed) && !permission.completed;
    }
  
    // Method to set completion status for all subtasks
    setAll(permission: Permission, completed: boolean): void {
      permission.completed = completed;
      this.updateAllComplete(permission);
    }


}
