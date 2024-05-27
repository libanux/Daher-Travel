import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { User } from '../../classes/User';
import { AdminService } from '../../service-folder/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit{
  arrayDropDown = ['Users', '2']

  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  selectedAdmin !: User
  editedUser: User
  userId: number = 0;
  userChanged: boolean = false;
  isEditing: boolean = false;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private signalService: BreadcrumbService) {
    this.editedUser = new User();
  }

  ngOnInit(): void {

    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne
  
    this.routeCurrently.set('Edit User')
    this.breadCrumb1.set(' / Users')
    this.breadCrumb1Route.set('/users')
    this.breadCrumb2.set(' / Edit User')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });

    this.adminService.GET_ADMIN_BY_ID(this.userId).subscribe({
      next: (response: any) => {
        this.selectedAdmin = response.my_User;
        // this.editedUser = { ...response.my_User };
       console.log("admin:",response)
      },
      error: (error: any) => { console.error(error); },
      complete: () => { }
    });
  }


  // editUser() {
  //   this.isEditing=true;
  //   this.adminService.EDIT_USER(this.editedUser).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //       this.isEditing=false;
  //       this.back();
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //       this.isEditing=false;
  //     },
  //     complete: () => { }
  //   });
  // }

  // FUNCTION TO COMPARE EDITED AND SELECTED USER
  // compareUsers(): void {
  //   this.userChanged =
  //     this.selectedUser.user_ID !== this.editedUser.user_ID ||
  //     this.selectedUser.owner_ID !== this.editedUser.owner_ID ||
  //     this.selectedUser.google_U !== this.editedUser.google_U ||
  //     this.selectedUser.first_NAME !== this.editedUser.first_NAME ||
  //     this.selectedUser.last_NAME !== this.editedUser.last_NAME ||
  //     this.selectedUser.username !== this.editedUser.username ||
  //     this.selectedUser.email !== this.editedUser.email ||
  //     this.selectedUser.password !== this.editedUser.password ||
  //     this.selectedUser.user_TYPE_CODE !== this.editedUser.user_TYPE_CODE ||
  //     this.selectedUser.user_LANG_CODE !== this.editedUser.user_LANG_CODE ||
  //     this.selectedUser.is_ACTIVE !== this.editedUser.is_ACTIVE ||
  //     this.selectedUser.is_DELETED !== this.editedUser.is_DELETED ||
  //     this.selectedUser.profile_COMPLETED !== this.editedUser.profile_COMPLETED ||
  //     this.selectedUser.entry_DATE !== this.editedUser.entry_DATE;
  // }

  //GO BACK FUNCTION
  back() {
    this.router.navigate(['/admins']);
  }
}
