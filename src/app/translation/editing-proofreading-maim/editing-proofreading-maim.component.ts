import { Component, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { SearchService } from '../../signals/search.service';
import { LoginService } from '../../signals/login.service';

@Component({
  selector: 'app-editing-proofreading-maim',
  templateUrl: './editing-proofreading-maim.component.html',
  styleUrl: './editing-proofreading-maim.component.css'
})
export class EditingProofreadingMaimComponent {


  routeCurrently = signal('');
  breadCrumb1 = signal('');
  breadCrumb1Route = signal('');
  breadCrumb2 = signal('');
  BCbeforeLastOneRoute = signal('');
  BCbeforeLastOne = signal('');
  showSearchBar = signal(false)

  constructor(private signalService: BreadcrumbService, private SearchService: SearchService ) {
  }

  ngOnInit(): void {
    this.SearchService.ShowAnalytics.set(false);
    this.SearchService.ShowSearchBar.set(false);
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Hotels')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Hotels')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

  }
}
