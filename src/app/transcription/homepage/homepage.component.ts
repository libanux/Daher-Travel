import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../subjects/breadcrumbs.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit{
  //Set the headers name & the visibility of the svg & the function when clicking on the svg
  HeadersArray = [
    { name: 'Customer Name',  isVisible: true, action: this.sortByName.bind(this)},
    { name: 'Company', isVisible: false },
    { name: 'Phone Number', isVisible: false },
    { name: 'Email', isVisible: false, action: this.sortByAge.bind(this) },
    { name: 'Status', isVisible: false, action: this.sortByAge.bind(this) },
  ];
  
  showShimmer = true;

  constructor(private routeService: BreadcrumbsService) {}

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

  this.routeService.sendBreadCrumb2('Transcription');
  this.routeService.sendBreadCrumb1('');
  this.routeService.sendBreadCrumb1Route('');
  this.routeService.sendcurrentRoute('')   
  this.routeService.sendBreadCrumbb4LO('');
  this.routeService.sendcurrentRoute('Transcription');

    setTimeout(() => {
      this.showShimmer = false;
    }, 2000);
}

filterUserBySearchKey(array: any[], searchKey: string) {}

filterWinnerBySearchKey(array: any[], searchKey: string) {}

}
