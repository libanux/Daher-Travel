import { Component, Input, effect } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SearchService } from '../../signals/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Input() showAnalytics = true;

  @Input() showSearchbar: boolean = true;


@Input() totalImmigrations: any;
@Input() acceptedImmigration: any
@Input() rejectedImmigration: any
@Input() NotHideCounts:boolean =true;

@Input() percentage_all: string = "";

constructor(private searchService: SearchService, private route: Router) { 
  effect(()=>{
    this.showAnalytics = this.searchService.ShowAnalytics();

  })
}

@Input() loadingData: boolean = true;
@Input() loadingData1: boolean = true;
@Input() loadingData2: boolean = true;
@Input() loadingData3: boolean = true;

get loadingData4(): boolean {
  return this.loadingData1 && this.loadingData2 && this.loadingData3;
}



ngOnInit(): void {

  const jwt = localStorage.getItem('jwtToken');
  if (jwt == null) {
    this.route.navigate(['login']);
  } else {
    // if (!this.jwtService.isLoggedIn()) {
    //   this.route.navigate(['login']);
    // } else {
   
    // }
  }
}


}