import { Component, OnInit } from '@angular/core';
import { Admin, Permissions_Array } from 'src/app/classes/admin.class';
import { Permission } from 'src/app/classes/adminPermissions.class';
import { AdminService } from 'src/app/services/Admins.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  admin: Admin = new Admin();
  UPDATED_ADMIN: Admin = new Admin();

  adminID: string = '';
  permissions: any = Permissions_Array

  //   config
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  //   basic
  allComplete: boolean = false;

  UpdateProfile = false;

  constructor(private adminService: AdminService, private breadCrumbService: BreadCrumbSignalService) {}

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Profile');
    this.GET_ADMIN_PROFILE();
  }

  SHOW_PROFILE = false;
  GET_ADMIN_PROFILE() {
    this.admin = this.adminService.ADMIN_LOGGED_IN
    this.UPDATED_ADMIN = {...this.adminService.ADMIN_LOGGED_IN}
    this.UPDATED_ADMIN.permissions = {...this.adminService.ADMIN_LOGGED_IN.permissions}
    this.SHOW_PROFILE = true;
  }

  EDIT_PROFILE() {
    this.UpdateProfile = true;
  }

  CANCEL_UPDATE() {
    this.UpdateProfile = false;
    this.UPDATED_ADMIN = {...this.admin}
    this.UPDATED_ADMIN.permissions = {...this.admin.permissions}
  }

  SAVE_EDIT() {
    this.adminService.UPDATE_ADMIN(this.UPDATED_ADMIN).subscribe({
      next: (response: any) => {
        this.admin = response.updatedAdmin;
        this.UPDATED_ADMIN = { ...response.updatedAdmin }
        this.UPDATED_ADMIN.permissions = { ...response.updatedAdmin.permissions }
      },
      error: (error: any) => {
        this.UPDATED_ADMIN = new Admin();
      },
      complete: () => {
        this.SHOW_PROFILE = true;
        this.UpdateProfile = false;
      }
    });
  }


}
