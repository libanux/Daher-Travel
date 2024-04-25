import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../subjects/breadcrumbs.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{

  arrayDropDown = ['Users', '2']

    constructor(private routeService: BreadcrumbsService) {}
    
    ngOnInit(): void {
      this.routeService.sendBreadCrumb2('Add Admin');
      this.routeService.sendBreadCrumb1('Admins');
      this.routeService.sendBreadCrumb1Route('');
      this.routeService.sendcurrentRoute('')   
      this.routeService.sendBreadCrumbb4LO('');
      this.routeService.sendcurrentRoute('Add Admin');
    
      }
    

  }