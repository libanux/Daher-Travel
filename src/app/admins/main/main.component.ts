import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../subjects/breadcrumbs.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  constructor(private routeService: BreadcrumbsService) {}
  
  ngOnInit(): void {
    this.routeService.sendBreadCrumb2('Admins');
    this.routeService.sendBreadCrumb1('');
    this.routeService.sendBreadCrumb1Route('');
    this.routeService.sendcurrentRoute('')   
    this.routeService.sendBreadCrumbb4LO('');
    this.routeService.sendcurrentRoute('Admins');

      setTimeout(() => {
        this.showShimmer = false;
      }, 2000);
    }
    

 //Set the headers name & the visibility of the svg & the function when clicking on the svg
 HeadersArray = [
  { name: 'Customer Name',  isVisible: true, action: this.sortByName.bind(this)},
  { name: 'Company', isVisible: false },
  { name: 'Phone Number', isVisible: false },
  { name: 'Email', isVisible: false, action: this.sortByAge.bind(this) },
  { name: 'Status', isVisible: false, action: this.sortByAge.bind(this) },
];

showShimmer = true;

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


filterUserBySearchKey(array: any[], searchKey: string) {}

filterWinnerBySearchKey(array: any[], searchKey: string) {}
}
