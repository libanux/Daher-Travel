import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { Router } from '@angular/router';
import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  arrayDropDown = ['Users', '2']

  user:User;
  errorMessage: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  message: string ="";
  isAdding: boolean = false;
  
  constructor(private userSevice: UserService,private router: Router,private signalService : BreadcrumbService){
    this.user = new User();
    this.user.user_TYPE_CODE='001';
    this.user.user_LANG_CODE='001';
    this.user.is_ACTIVE=true;
    this.user.is_DELETED=false;
    this.user.owner_ID=1;
    this.user.user_ID=-1;
  }

    ngOnInit(): void {
      this.routeCurrently = this.signalService.routeCurrently
      this.breadCrumb1 = this.signalService.breadCrumb1
      this.breadCrumb1Route = this.signalService.breadCrumb1Route
      this.breadCrumb2 = this.signalService.breadCrumb2
      this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
      this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

      this.routeCurrently.set('Admins')
      this.breadCrumb1.set(' / Admins')
      this.breadCrumb1Route.set('')
      this.breadCrumb2.set(' / Add Admin')
      this.BCbeforeLastOneRoute.set('')
      this.BCbeforeLastOne.set('')
      }


//ADD USER
addUser(){
  this.isAdding=true;
  if (this.isValidUser()) {
    this.userSevice.ADD_USER(this.user).subscribe({
      next: (response: any) => {
      this.message="";
      this.isAdding=false;
      this.router.navigate(['/admins']);
      },
      error: (error: any) => { console.log(error);
        this.message = error.error.exceptionMsg;
        this.isAdding=false;
       },
      complete: () => { }
    });
  } 
}

//VALIDATE USER FORM
isValidUser(): boolean {
  let isValid = true;

  if (this.user.first_NAME.trim() === '') {
    this.firstNameError = 'First name is required.';
    isValid = false;
  } else {
    this.firstNameError = '';
  }

  if (this.user.last_NAME.trim() === '') {
    this.lastNameError = 'Last name is required.';
    isValid = false;
  } else {
    this.lastNameError = '';
  }

  if (this.user.username.trim() === '') {
    this.usernameError = 'Username is required.';
    isValid = false;
  } else {
    this.usernameError = '';
  }

  if (this.user.email.trim() === '') {
    this.emailError = 'Email is required.';
    isValid = false;
  } else if (!this.isValidEmail(this.user.email)) {
    this.emailError = 'Please enter a valid email address.';
    isValid = false;
  } else {
    this.emailError = '';
  }

  if (this.user.password.trim() === '') {
    this.passwordError = 'Password is required.';
    isValid = false;
  } else {
    this.passwordError = '';
  }

  return isValid;
}

//VALIDATE EMAIL FORMAT
isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
    

  }