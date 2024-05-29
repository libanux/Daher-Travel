import { Component, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrl: './analytics-main.component.css'
})
export class AnalyticsMainComponent {
  routeCurrently = signal('');
  breadCrumb1 = signal('');
  breadCrumb1Route = signal('');
  breadCrumb2 = signal('');
  BCbeforeLastOneRoute = signal('');
  BCbeforeLastOne = signal('');

  constructor(private signalService: BreadcrumbService) { }

  ngOnInit(): void {
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Analytics')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Analitics')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')
  }
}
