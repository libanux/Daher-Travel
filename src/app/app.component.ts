import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'Daher Travel';
  isLoggedIn = false;

  constructor(private router:Router,private authService: AuthService){}

  ngOnInit(): void {
  if(this.authService.isTokenExpired1()){
    this.router.navigate(['/login']).then(() => {
      window.scrollTo(0, 0);
    })
  }
    if (localStorage.getItem('TICKET') != '') {
      this.isLoggedIn = true;
      this.router.navigate(['/tickets']).then(() => {
        window.scrollTo(0, 0);
      })
    }
     else if (localStorage.getItem('TICKET') == ''){
      this.isLoggedIn = false;   
        this.router.navigate(['/login']).then(() => {
          window.scrollTo(0, 0);
        })
    }


  }
  
  
  
}
