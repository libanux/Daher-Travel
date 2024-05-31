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

  // Translation
  Translation_routes = ['/translation/EditingAndProofreadingMain','/translation/WebsiteMain','translation/documentMain','/translation/documentTranslation','translation/websiteTranslation','translation/EditingAndProofreading']
    // Document Translation
    DOC_Translation_routes = ['translation/documentMain','/translation/documentTranslation']
    // Document Translation
    WEB_Translation_routes = ['translation/WebsiteMain','/translation/websiteTranslation']
    // Document Translation
    EDIT_Translation_routes = ['translation/EditingAndProofreadingMain','/translation/EditingAndProofreading']

  Transaction_routes = ['/transaction','/transaction/edit','/transaction'];
  Dashboard_routes = ['/dashboard']

  // Audio Visual
  AudioVisual_routes = ['audioVisual/TranslationMain','audioVisual/TranscriptionMain','audioVisual/SubtitlingMain']
        // 
        Sub_AudioVisual_routes = ['audioVisual/SubtitlingMain']
        // 
        Transcription_AudioVisual_routes = ['audioVisual/TranscriptionMain']
        // 
        Translation_AudioVisual_routes = ['audioVisual/TranslationMain']

  contentServices_routes =['/contentServices','/contentServices','/contentServices'];
  analytics_routes = ['/analytics']
  users_routes = ['/users', '/users/view','/users'];
  admins_routes =['/admins', '/admins/add', '/admins/edit']
  settings_routes = ['/settings'];
  notifications_routes =['/notification','/notification','/notification'];


  

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


  // ACTIVE ROUTE
Active(routeArray: string[]): boolean {
  const currentRoute = this.router.url;
  return routeArray.some(route => currentRoute.includes(route));
}

// Define the isActive method to color the links in the sidebar
// isActive(route: string): boolean {
//   return this.router.isActive(route, true);
// }


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
