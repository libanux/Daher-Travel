import { Component, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';

@Component({
  selector: 'app-rec-main',
  templateUrl: './rec-main.component.html',
  styleUrl: './rec-main.component.css'
})
export class RecMainComponent {
  routeCurrently = signal('');
  breadCrumb1 = signal('');
  breadCrumb1Route = signal('');
  breadCrumb2 = signal('');
  BCbeforeLastOneRoute = signal('');
  BCbeforeLastOne = signal('');
  showloadingOnLogin: boolean = true

  constructor(private signalService: BreadcrumbService) { }

  ngOnInit(): void {
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Labor Recuitment')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Labor Recuitment')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

  }
}