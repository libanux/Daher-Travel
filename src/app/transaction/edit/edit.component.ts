import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  
  constructor(private signalService : BreadcrumbService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('Edit Transaction')
  this.breadCrumb1.set(' / Transactions')
  this.breadCrumb1Route.set('/transaction')
  this.breadCrumb2.set(' / Edit Transaction')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')

  this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
    const productID = params['id'];
  });

}


Edit(Payment: any){
  
}

}
