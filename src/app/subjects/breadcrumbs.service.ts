import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

//   Bread Crumbs
// these are used in every module (component)
//  where we send the the current route we are in to display it in the breadcrumbs component (in shared-module)
BreadCrumb1: Subject<string> = new Subject<string>();
public recieveBreadCrumb1(): Observable<string>{
       return this.BreadCrumb1.asObservable();
}

public sendBreadCrumb1(value:string){
       this.BreadCrumb1.next(value)
}

BreadCrumb1Route: Subject<string> = new Subject<string>();
public recieveBreadCrumb1Route(): Observable<string>{
       return this.BreadCrumb1Route.asObservable();
}

public sendBreadCrumb1Route(value:string){
       this.BreadCrumb1Route.next(value)
}

BreadCrumb2: Subject<string> = new Subject<string>();
public recieveBreadCrumb2(): Observable<string>{
       return this.BreadCrumb2.asObservable();
}

public sendBreadCrumb2(value:string){
       this.BreadCrumb2.next(value)
}

BreadCrumbb4LO: Subject<string> = new Subject<string>();
public recieveBreadCrumbb4LO(): Observable<string>{
       return this.BreadCrumbb4LO.asObservable();
}

public sendBreadCrumbb4LO(value:string){
       this.BreadCrumbb4LO.next(value)
}

BreadCrumbb4LORoute: Subject<string> = new Subject<string>();
public recieveBreadCrumbb4LORoute(): Observable<string>{
       return this.BreadCrumbb4LORoute.asObservable();
}

public sendBreadCrumbb4LORoute(value:string){
       this.BreadCrumbb4LORoute.next(value)
}
currentRoute: Subject<string> = new Subject<string>();
public recievecurrentRoute(): Observable<string>{
       return this.currentRoute.asObservable();
}

public sendcurrentRoute(value:string){
       this.currentRoute.next(value);
}
// =========================================================================================


}
