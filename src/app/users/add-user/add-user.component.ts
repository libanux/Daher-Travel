import { Component } from '@angular/core';
import { User } from '../../classes/User';
import { UserService } from '../../service-folder/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
user:User;
errorMessage: string = '';
firstNameError: string = '';
lastNameError: string = '';
usernameError: string = '';
emailError: string = '';
passwordError: string = '';
message: string ="";
isAdding: boolean = false;

constructor(private userSevice: UserService,private router: Router){
  this.user = new User();
  this.user.user_TYPE_CODE='001';
  this.user.user_LANG_CODE='001';
  this.user.is_ACTIVE=true;
  this.user.is_DELETED=false;
  this.user.owner_ID=1;
  this.user.user_ID=-1;
}
//ADD USER
addUser(){
  this.isAdding=true;
  if (this.isValidUser()) {
    this.userSevice.ADD_USER(this.user).subscribe({
      next: (response: any) => {
      this.message="";
      this.isAdding=false;
      },
      error: (error: any) => { console.log(error);
        this.message = error.error.exceptionMsg;
        this.isAdding=false;
        this.router.navigate(['/users']);
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
