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
  UPDATED_ADMIN: Admin;

  adminID: string = '';
  permissions: any = PERMISSIONS

  //   config
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  //   basic
  allComplete: boolean = false;

  UpdateProfile = false;

  constructor(private adminService: AdminService, private breadCrumbService: BreadCrumbSignalService) {
    this.admin = new Admin();
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Profile');
    this.adminID = localStorage.getItem('admin_id') || ''; // Get admin ID from local storage
    this.GET_ADMIN_PROFILE_BY_ID(this.adminID);

  }

  EDIT_PROFILE(){
    this.UpdateProfile = true;
    this.UPDATED_ADMIN = {...this.admin}
  }

  CANCEL_UPDATE(){
    this.UpdateProfile = false;
    this.GET_ADMIN_PROFILE_BY_ID(this.adminID);
  }

  SAVE_EDIT(){

  }

SHOW_PROFILE = false;
  GET_ADMIN_PROFILE_BY_ID(ID: string) {
    this.adminService.GET_ADMIN_BY_ID(ID).subscribe({
      next: (response: any) => {
        this.admin = response;
        this.UPDATED_ADMIN = response
        this.permissions = this.mapPermissions(response.permissions);
      },
      error: (error: any) => { 
       this.UPDATED_ADMIN = new Admin();
      },
      complete: () => { 
        this.SHOW_PROFILE = true;
        console.log(this.admin)
      }
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
