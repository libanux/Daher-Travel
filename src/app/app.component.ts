import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'servSmart';
  showloadingOnLogin = false ;
  // showloadingOnReload = true ;
  
    showSidebar = false;
    showHeader: boolean = false;
    showSearchBar: boolean = true;
  
  constructor(private router: Router,private zone: NgZone) { }
  
  
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.zone.run(() => {
          if (event.url === '/') {
            this.showHeader = false;
            this.showSidebar = false;
          } else {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            // if (isLoggedIn) {
              this.showloadingOnLogin = true;
  
              setTimeout(() => {
                this.showloadingOnLogin = false;
                this.showHeader = true;
                this.showSidebar = true;
              }, 1000);
            // }
          }
  
          // Check if the route is '/dashboard' and set showSearchBar to false
          if (event.url === '/dashboard') {
            this.showSearchBar = false;
          }
          
        });
      });
  }
  }
  
  
  
  
  
  
  