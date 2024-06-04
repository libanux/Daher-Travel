import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent{

  routeCurrently = ('');
  breadCrumb1 =  ('');
  breadCrumb1Route =  ('');
  breadCrumb2 =  ('');
  BCbeforeLastOneRoute=  ('');
  BCbeforeLastOne =  ('');

  constructor(private router: Router) {
   }

  // ngOnInit(): void {
  //   this.routeService.recieveBreadCrumb1().subscribe({
  //     next: (response: string) => {
  //       this.breadCrumb1 = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });

  //   this.routeService.recieveBreadCrumb2().subscribe({
  //     next: (response: string) => {
  //       this.breadCrumb2 = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });

  //   this.routeService.recieveBreadCrumb1Route().subscribe({
  //     next: (response: string) => {
  //       this.breadCrumb1Route = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });

  //   this.routeService.recieveBreadCrumbb4LO().subscribe({
  //     next: (response: string) => {
  //       this.BCbeforeLastOne = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });   
    
  //   this.routeService.recieveBreadCrumbb4LORoute().subscribe({
  //     next: (response: string) => {
  //       this.BCbeforeLastOneRoute = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });

  //   this.routeService.recievecurrentRoute().subscribe({
  //     next: (response: string) => {
  //       this.routeCurrently = response;
  //       this.cdr.detectChanges(); // Manually trigger change detection
  //     }
  //   });
  // }


  moveToRoute(route: string): void {
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

