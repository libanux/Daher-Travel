import { Component, OnInit, effect, signal } from '@angular/core';
import { Admin } from 'src/app/classes/admin.class';
import { AdminService } from 'src/app/services/Admins.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  admin: Admin;
  adminID: string = '';

  constructor(private adminService: AdminService) {
    this.admin = new Admin();

    const admin_id = localStorage.getItem("admin_id");
    if (admin_id) {
      this.adminID = admin_id;
    }

  }

  ngOnInit(): void {
    this.GET_ADMIN_PROFILE_BY_ID(this.adminID)
  }

  GET_ADMIN_PROFILE_BY_ID(ID: string) {
    this.adminService.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => { this.admin = response; },
      error: (error: any) => { console.error('Error:', error); },
      complete: () => { }
    });
  }
}
