import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  
  //Set the headers name & the visibility of the svg & the function when clicking on the svg
  HeadersArray = [
    { name: 'Customer Name',  isVisible: true, action: this.sortByName.bind(this)},
    { name: 'Company', isVisible: false },
    { name: 'Phone Number', isVisible: false },
    { name: 'Email', isVisible: false, action: this.sortByAge.bind(this) },
    { name: 'Status', isVisible: false, action: this.sortByAge.bind(this) },
  ];
  
  showShimmer = true;

  constructor(private signalService : BreadcrumbService) { }

  //Here the functions  will be called on clicking respective SVGs in
handleSvgClick(func: Function) {
  if (func) {
    func();
  }
}

sortByName() {
}

sortByAge() {
}

ngOnInit() {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('Transcription')
  this.breadCrumb1.set('')
  this.breadCrumb1Route.set('')
  this.breadCrumb2.set(' / Transcription')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')

    setTimeout(() => {
      this.showShimmer = false;
    }, 2000);
}

filterUserBySearchKey(array: any[], searchKey: string) {}

filterWinnerBySearchKey(array: any[], searchKey: string) {}

}
