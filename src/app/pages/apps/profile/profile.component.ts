import { Component, OnInit, effect, signal } from '@angular/core';
import { Admin } from 'src/app/classes/admin.class';
import { AdminService } from 'src/app/services/Admins.service';
import { AuthSignalService } from 'src/app/signals/authentication.signal.servise';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  admin: Admin;
  adminID: string = '';

  viewed_admin = signal(
    {
        _id: '',
        firstname: '',
        lastname:  '',
        email:  '',
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
        token: '',
    }
  );
  
  constructor(private adminService: AdminService, private authSignalService: AuthSignalService) {
    this.admin=new Admin();
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.adminID = userId;
    }

  }
  
  ngOnInit(): void {

    this.viewed_admin = this.authSignalService.logged_in_admin
    console.log(this.viewed_admin())

    console.log(this.viewed_admin)
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
