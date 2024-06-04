import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SidebarElements, sidebarArray } from 'src/app/classes/sidebarElements';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() showCloseButton = false;
  @Input() logo = './assets/download.png'

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

  constructor( private router: Router) { }
 
  ngOnInit(): void {
    this.sidebarArray = sidebarArray;
  }

  //LOGOUT FUNCTION 
  logout() {
    localStorage.removeItem('TICKET');
    localStorage.removeItem('userId');
    // localStorage.removeItem('userId');
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
