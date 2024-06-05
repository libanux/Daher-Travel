import { Component, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoginService } from '../../signals/login.service';
import { SidebarElements, sidebarArray } from '../../classes/sidebarElements';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() showCloseButton = false;
  @Input() logo = './assets/download.png'

  sidebarArray: SidebarElements [] = []

  logout_element: any = {  
    name: 'Log out', 
   icon: './assets/logout.png', 
   route_array: ['/settings'],
   route: 'settings',
   group: 'bottom',
   dropdown_Array: [],
   show: '',
   function: 'logout()'
}

  constructor( private router: Router) { }
 
  ngOnInit(): void {
    this.sidebarArray = sidebarArray;
  }

  //LOGOUT FUNCTION 
  logout() {

    this.router.navigate(['']);
  }

  // ROUTING FUNCTION
  moveToRoute(route: string) {
    this.router.navigate([route]).then(() => { window.scrollTo(0, 0) });
  }

  // ACTIVE ROUTE
Active(routeArray: any[]): boolean {
  const currentRoute = this.router.url;
  return routeArray.some(route => currentRoute.includes(route));
}

  showTranslation = false;
  showAudioVisual = false
  showMore(value : string) {

    switch (value) {
      case "Translation":
        this.showTranslation=!this.showTranslation;
        break;
  
      case "showAudioVisual":
        this.showAudioVisual=!this.showAudioVisual;
        break;

  }
  }
}
