import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  Ticket: string

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.Ticket = localStorage.getItem('TICKET') || ""

    if (this.Ticket !== null && this.Ticket !== "") {
      return true;
    }

    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
