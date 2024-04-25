import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../subjects/breadcrumbs.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{

  constructor(private routeService: BreadcrumbsService) {}
  
  ngOnInit(): void {
    this.routeService.sendBreadCrumb2('view User');
    this.routeService.sendBreadCrumb1('Users');
    this.routeService.sendBreadCrumb1Route('');
    this.routeService.sendcurrentRoute('')   
    this.routeService.sendBreadCrumbb4LO('');
    this.routeService.sendcurrentRoute('view User');
  
    }
  }