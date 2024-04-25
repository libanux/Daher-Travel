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
    this.routeService.sendBreadCrumb2('Services');
    this.routeService.sendBreadCrumb1('');
    this.routeService.sendBreadCrumb1Route('');
    this.routeService.sendcurrentRoute('')   
    this.routeService.sendBreadCrumbb4LO('');
    this.routeService.sendcurrentRoute('Services');
  
    }
}
