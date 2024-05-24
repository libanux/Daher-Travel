import { Component, NgZone, effect, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './signals/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  title = 'servSmart';
  showloadingOnLogin = false;

  showSearchBar = false;
  // showHeader: boolean = false;
  // showSidebar: boolean = true;

  showHeader =  signal(false);
  showSidebar =  signal(false);

  constructor(private signalLoginService : LoginService, private router: Router, private zone: NgZone) {
    effect(() => {
      // console.log(`show header is: `, this.showHeader());
      // console.log(`show sidebar is: `, this.showSidebar());
    });
    
   }


ngOnInit(): void {
  this.showHeader = this.signalLoginService.showHeader;
  this.showSidebar = this.signalLoginService.showSidebar

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.zone.run(() => {
          if (event.url === '/') {
            // this.showHeader = false;
            // this.showSidebar = false;

            this.showHeader.set(false)
            this.showSidebar.set(false)

          } else {
            setTimeout(() => {
              this.showloadingOnLogin = false;
              // this.showHeader = true;
            // this.showSidebar = true;

              this.showHeader.set(true)
              this.showSidebar.set(true)

            }, 1000);
          }

          if (event.url === '/dashboard') {
            this.showSearchBar = false;
          }

          if (event.url === '/dashboard' && this.showSidebar() == false) {
            this.showloadingOnLogin = true;
          }
        });
      });
  }
}
