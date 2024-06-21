import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'Daher Travel';
  isLoggedIn = false;

  constructor(private router:Router){}

  ngOnInit(): void {
  
    if (localStorage.getItem('TICKET') != '') {
      this.isLoggedIn = true;
      this.router.navigate(['/apps/tickets']).then(() => {
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
