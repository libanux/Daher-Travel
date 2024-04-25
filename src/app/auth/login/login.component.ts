import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';
  loading : boolean = false;

  constructor( private router: Router) { }
  


validateEmail() {
  this.emailError = '';
  if (this.email.trim() === '') {
    this.emailError = "Email Required.";
  } 
  else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) { this.emailError = "Invalid Email"; }
    }
}

validatePassword() {
  this.passwordError = '';
  if (this.password.trim() === '') {
    this.passwordError = "Password Required.";
  }
}

// login.component.ts
 login() {
  if(this.email == 'admin@gmail.com' && this.password=='123'){
    localStorage.setItem('isLoggedIn','true');
    this.router.navigate(['/dashboard']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  else{
    if(this.email ==''){
      this.emailError='Email required';
    }
    if(this.password ==''){
      this.passwordError='Password required'
    }
    else{
      this.passwordError='Invalid Email or Password'
    }
  }
 
  // this.validateEmail();
  // this.validatePassword();

  // this.loginError = ''; // Reset login error

  // if (this.emailError === '' && this.passwordError === '') {
  //   this.loading = true;

  //   try {
  //     if (await this.authserivece.isLoggedIn()) { // Call isLoggedIn without arguments
  //       this.loading = false;
        
  //       this.subjectService.sendisLoggedInValue(true);
  
  //       this.router.navigate(['/dashboard']).then(() => {
  //         window.scrollTo(0, 0);
  //       });
  //     } 
      
  //     else {
  //       this.loading = false;
  //       const error = 'Login error';
  //       this.loginError = error;
  //     }
  //   } catch (error: any) {
  //     this.loading = false;
  //     console.error('Login error:', error.message);
  //     this.loginError = error.message;
  //   }
  // }
}

}
