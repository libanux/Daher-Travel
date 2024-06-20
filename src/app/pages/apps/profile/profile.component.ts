import { Component, OnInit, effect, signal } from '@angular/core';
import { Admin, PERMISSIONS } from 'src/app/classes/admin.class';
import { AdminService } from 'src/app/services/Admins.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  admin: Admin;
  adminID: string = '';
  permissions: any = PERMISSIONS

  constructor(private adminService: AdminService) {
    this.admin = new Admin();

    const admin_id = localStorage.getItem("admin_id");
    if (admin_id) {
      this.adminID = admin_id;
    }

  }

  ngOnInit(): void {
    this.GET_ADMIN_PROFILE_BY_ID(this.adminID);
    console.log(this.permissions)
  }

  GET_ADMIN_PROFILE_BY_ID(ID: string) {
    this.adminService.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => {
        console.log(response)
         this.admin = response; 
        
        },
      error: (error: any) => { console.error('Error:', error); },
      complete: () => { }
    });
  }


  // PERMISSIONS

    //   config
    checked = false;
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
  
    //   basic
    allComplete: boolean = false;
  
    updateAllComplete() {
      this.allComplete =
        this.permissions.subtasks != null &&
        this.permissions.subtasks.every((t: any) => t.completed);
    }
  
    someComplete(): boolean {
      if (this.permissions.subtasks == null) {
        return false;
      }
      return (
        this.permissions.subtasks.filter((t: any) => t.completed).length > 0 &&
        !this.allComplete
      );
    }
  
    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.permissions.subtasks == null) {
        return;
      }
      this.permissions.subtasks.forEach((t: any) => (t.completed = completed));
    }
}
