import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { SearchService } from '../../signals/search.service';

@Component({
  selector: 'app-website-main',
  templateUrl: './website-main.component.html',
  styleUrl: './website-main.component.css'
})

export class WebsiteMainComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  constructor(private signalService : BreadcrumbService, private SearchService: SearchService) { }

  ngOnInit(): void {
    this.SearchService.ShowSearchBar.set(false);
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Tourism  Visa')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Tourism  Visa')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

  
    }
  }