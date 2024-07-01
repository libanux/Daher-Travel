import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteSignalService {



  show_pop_up_route = signal(false)


  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Handle NavigationEnd event here
        if (event.urlAfterRedirects !== '/error') {
          localStorage.setItem('previousUrl', event.urlAfterRedirects);
        }
      });
  }

 
}
