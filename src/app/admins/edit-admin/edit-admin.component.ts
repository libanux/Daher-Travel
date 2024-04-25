import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../subjects/breadcrumbs.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit{
  arrayDropDown = ['Users', '2']


    constructor(private routeService: BreadcrumbsService) {}
    
    ngOnInit(): void {
      this.routeService.sendBreadCrumb2('Edit Admin');
      this.routeService.sendBreadCrumb1('Admins');
      this.routeService.sendBreadCrumb1Route('');
      this.routeService.sendcurrentRoute('')   
      this.routeService.sendBreadCrumbb4LO('');
      this.routeService.sendcurrentRoute('Edit Admin');
    
      }
}
