import { Component, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoginService } from '../../signals/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  @Input() showCloseButton = false;
  @Input() logo = './assets/ServSmart-Logo1.png'

  showHeader =  signal(false);
  showSidebar =  signal(false);
  
  constructor(private signalLoginService : LoginService, private router: Router, private sanitizer: DomSanitizer) { }
 
  ngOnInit(): void {
    this.showHeader = this.signalLoginService.showHeader;
    this.showSidebar = this.signalLoginService.showSidebar
  }


  //LOGOUT FUNCTION 
  logout() {
    localStorage.removeItem('TICKET');
    localStorage.removeItem('userId');
    // localStorage.removeItem('userId');
    this.router.navigate(['']);

    this.showHeader.set(false)
    this.showSidebar.set(false)
  }

  // ROUTING FUNCTION
  moveToRoute(route: string) {
    this.router.navigate([route]).then(() => { window.scrollTo(0, 0) });
  }


  //ACTIVE ROUTE
  isActive3(route1: string, route2: string, route3: string): boolean {
    const currentRoute = this.router.url;
    // Define an array of routes you want to consider for activation
    const desiredRoutes = [route1, route2, route3];
    return desiredRoutes.some(desiredRoute => currentRoute.includes(desiredRoute));
  }

  showTranslation = false;
  showAudioVisual = false
  showMore(value : string) {

    switch (value) {
      case "translation":
        this.showTranslation=!this.showTranslation;
        break;
  
      case "showAudioVisual":
        this.showAudioVisual=!this.showAudioVisual;
        break;
  
      // case "Size":
      //   this.showSizes=!this.showSizes;
      //   break;
  
      // case "Category":
      //   this.showCategories=!this.showCategories;
      //   break;
  
      // case "Price":
      //   this.showPrices=!this.showPrices;
      //   break;
  }
  }
}
