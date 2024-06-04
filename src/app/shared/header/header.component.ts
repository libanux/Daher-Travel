import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() showSearchbar: boolean = true;
  // currentRoute: string = '';
    constructor(private router: Router) { }
  
    ngOnInit(): void {
      
      // this.router.events
      //   .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      //   .subscribe((event: NavigationEnd) => {
      //     // Update currentRoute when navigation ends
      //     this.currentRoute = event.urlAfterRedirects;
      //   });
    }
}
