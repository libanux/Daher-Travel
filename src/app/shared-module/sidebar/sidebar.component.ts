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
export class SidebarComponent implements OnInit{

  @Input() showCloseButton = false;
  @Input() logo = './assets/ServSmart-Logo1.png'

  showHeader =  signal(false);
  showSidebar =  signal(false);

  
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


  sidebarArray: SidebarElements [] = []

  constructor(private signalLoginService : LoginService, private router: Router, private sanitizer: DomSanitizer) { }
 
  ngOnInit(): void {
    this.sidebarArray = sidebarArray;

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
