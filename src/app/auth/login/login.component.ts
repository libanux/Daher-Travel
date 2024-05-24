import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Params_Authenticate } from '../../service-folder/auth.service';
import { LoginService } from '../../signals/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';
  loading: boolean = false;

  showHeader =  signal(false);
  showSidebar =  signal(false);

  constructor(private signalLoginService : LoginService,  private router: Router, private authserivece: AuthService) { }
 
  ngOnInit(): void {
    this.showHeader = this.signalLoginService.showHeader;
    this.showSidebar = this.signalLoginService.showSidebar
  
    this.showHeader.set(false)
    this.showSidebar.set(false)      
  }

  //EMAIL VALIDATION
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


  //PASSWORD VALIDATION
  validatePassword() {
    this.passwordError = '';
    if (this.password.trim() === '') {
      this.passwordError = "Password Required.";
    }
  }

  //LOGIN FUNCTION
  login() {
    this.validateEmail();
    this.validatePassword();
    this.loading = true;
    this.loginError = '';
    if (this.emailError === '' && this.passwordError === '') {

      const authenticationParams: Params_Authenticate = {
        EMAIL: this.email,
        PASSWORD: this.password,
        IS_ACTIVE: true,
        PLATFORM: "DASH"
      };

      this.authserivece.authenticate(authenticationParams).subscribe({
        next: (response: any) => {
          if (response.myResult != null) {
            this.loading = false;
            this.router.navigate(['/dashboard']).then(() => {
              window.scrollTo(0, 0);
            }),
              localStorage.setItem('TICKET', response.myResult.ticket),
              localStorage.setItem('userId', response.myResult.userID)
          }
          else {
            // this.loginError = 'Incorrect Email or password';
            this.loading = false;
          }
        },
        error: (error: any) => {
          this.loading = false;
          // this.loginError = 'Authentication failed. Please check your credentials.';
           this.passwordError = error.error.exceptionMsg;
          // this.passwordError = 'Incorrect Email or password';
        }
      });
    }
    else {
      this.loading = false;
    }
  }


  //LOGIN WHEN CLICK ENTER KEY
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  
}


