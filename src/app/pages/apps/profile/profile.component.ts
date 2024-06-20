import { Component, OnInit } from '@angular/core';
import { Admin, PERMISSIONS } from 'src/app/classes/admin.class';
import { Permission } from 'src/app/classes/adminPermissions.class';
import { AdminService } from 'src/app/services/Admins.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  admin: Admin;
  adminID: string = '';
  permissions: any = PERMISSIONS

    //   config
    checked = false;
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
  
    //   basic
    allComplete: boolean = false;

  constructor(private adminService: AdminService, private breadCrumbService: BreadCrumbSignalService) {
    this.admin = new Admin();
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Profile');
    this.adminID = localStorage.getItem('admin_id') || ''; // Get admin ID from local storage
    this.GET_ADMIN_PROFILE_BY_ID(this.adminID);
  }

  GET_ADMIN_PROFILE_BY_ID(ID: string) {
    this.adminService.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => {
        console.log(response)
         this.admin = response; 
         this.permissions = this.mapPermissions(response.permissions); // Map permissions from admin object
        console.log('Admin and Permissions:', this.admin, this.permissions);
        },
      error: (error: any) => { console.error('Error:', error); },
      complete: () => { }
    });
  }

    // Method to map permissions to match interface structure
   mapPermissions(permissions: any): Permission[] {
      return Object.keys(permissions).map(key => ({
        name: key,
        completed: permissions[key] === 'write' || permissions[key] === 'read', // Adjust based on your logic
        color: 'accent', // Set color dynamically if needed
        subtasks: [
          { name: 'Read', completed: permissions[key] === 'read', color: 'primary' },
          { name: 'Write', completed: permissions[key] === 'write', color: 'primary' }
        ]
      }));
    }



  // Method to update all subtasks completion status
  updateAllComplete(permission: Permission): void {
    permission.subtasks.forEach((subtask:any) => subtask.completed = permission.completed);
  }

  // Method to check if some subtasks are completed
  someComplete(permission: Permission): boolean {
    return permission.subtasks.some((subtask:any) => subtask.completed) && !permission.completed;
  }

  // Method to set completion status for all subtasks
  setAll(permission: Permission, completed: boolean): void {
    permission.completed = completed;
    this.updateAllComplete(permission);
  }
}
