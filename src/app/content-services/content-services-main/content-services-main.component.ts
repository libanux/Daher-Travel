import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { SearchService } from '../../signals/search.service';

@Component({
  selector: 'app-content-services-main',
  templateUrl: './content-services-main.component.html',
  styleUrl: './content-services-main.component.css'
})
export class ContentServicesMainComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 = signal('');
  breadCrumb1Route = signal('');
  breadCrumb2 = signal('');
  BCbeforeLastOneRoute = signal('');
  BCbeforeLastOne = signal('');
  showSearchBar = signal(false)

  constructor(private signalService: BreadcrumbService, private SearchService : SearchService) {
  }

  ngOnInit(): void {
    this.SearchService.ShowSearchBar.set(false);
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Transportation Services')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Transportation Services')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

  }
}
