import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  
  constructor() { }
}
