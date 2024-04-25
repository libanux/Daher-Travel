import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() showCloseButton = false;
  @Input() logo = './assets/ServSmart-Logo1.png'

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

logout() {
  localStorage.removeItem('accessToken');
  this.router.navigate(['']);
}

// function for routing
moveToRoute(route: string) {
  this.router.navigate([route]).then(() => {window.scrollTo(0, 0)});
}

  // Define the isActive method to color the links in the sidebar
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  isActive2(route1: string, route2: string): boolean {
    const currentRoute = this.router.url;
    // Define an array of routes you want to consider for activation
    const desiredRoutes = [route1, route2];
    return desiredRoutes.some(desiredRoute => currentRoute.includes(desiredRoute));
  }

  isActive3(route1: string, route2: string, route3: string): boolean {
    const currentRoute = this.router.url;
    // Define an array of routes you want to consider for activation
    const desiredRoutes = [route1, route2, route3];
    return desiredRoutes.some(desiredRoute => currentRoute.includes(desiredRoute));
  }


  show = false;
  showMore()
{
this.show = ! this.show
}
}
