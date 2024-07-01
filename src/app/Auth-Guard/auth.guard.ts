import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  Ticket : string 

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      console.log(localStorage.getItem('TICKET'))
      this.Ticket = localStorage.getItem('TICKET') || ""
      console.log('ticket is = ', this.Ticket)

    if (  this.Ticket !== null && this.Ticket !== "" ) {
      console.log("in ticket not empty")
      return true;
    }

    else {
      console.log("in ticket empty")
      this.router.navigate(['/login']);
      return false;
    }
}
}
