import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/classes/admin.class';
import { AdminService } from 'src/app/services/Admins.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  admin: Admin;
  adminID: string = '';
  
  constructor(private adminService: AdminService) {
    this.admin=new Admin();
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.adminID = userId;
    }
  }
  
  ngOnInit(): void {

      this.adminService.GET_ADMIN_BY_ID(this.adminID).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.admin=response;
          },
          error: (error: any) => {
            console.error('Error:', error);
          },
          complete: () => { }
        });
  }

}
