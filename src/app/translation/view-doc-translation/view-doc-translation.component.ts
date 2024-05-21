import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';

@Component({
  selector: 'app-view-doc-translation',
  templateUrl: './view-doc-translation.component.html',
  styleUrl: './view-doc-translation.component.css'
})
export class ViewDocTranslationComponent implements OnInit{

  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  constructor(private signalService : BreadcrumbService) { }

ngOnInit(): void {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('View Translation')
  this.breadCrumb1.set('/ Translation')
  this.breadCrumb1Route.set('/translation')
  this.breadCrumb2.set(' / View Translation')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')

  
}
}
