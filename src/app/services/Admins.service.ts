import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { environment } from 'src/enviroment/enviroment';
import { Admin } from '../classes/admin.class';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = '';
  private pagingSize = 10;
  public ADMIN_LOGGED_IN: Admin;
  adminID: string;

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.adminID = localStorage.getItem('admin_id') || '';

    // GET ADMIN LOGGED IN BY ID STORED IN LOCAL STORAGE
    this.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => { this.ADMIN_LOGGED_IN = response; },
      error: (error: any) => { },
      complete: () => { console.log('after change in service : ', this.ADMIN_LOGGED_IN) }

    });
  }

  // VALIDATE TOKEN
  isTokenExpired1(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return true;
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload.exp) return true;
    const expirationTime = payload.exp * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  // GET TOKEN FROM LOCAL STORAGE
  getToken(): string | null {
    return localStorage.getItem('TICKET');
  }

  //GET ALL ADMIN
  GET_ALL_ADMINS(currentPage: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "page": currentPage,
      "pageSize": pageSize
    }
    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_ADMINS', requestBody, { headers });
  }

  // ADD NEW ADMIN
  ADD_ADMIN(admin: Admin): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "firstname": admin.firstname,
      "lastname": admin.lastname,
      "email": admin.email,
      "phone": admin.phone,
      "password": admin.password,
      "permissions": {
        "packages": admin.permissions.packages,
        "visa": admin.permissions.visa,
        "recruitment": admin.permissions.recruitment,
        "accounting": admin.permissions.accounting,
        "users": admin.permissions.users,
        "notes": admin.permissions.notes,
      }
    };
    return this.httpClient.post<any>(this.apiUrl + '/SIGN_UP', requestBody, { headers })
  }

  // NOT WORKING YET
  // DELETE ADMIN
  DELETE_ADMIN(ID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "adminId": ID
    }
    return this.httpClient.post<any>(this.apiUrl + '/DELETE_ADMIN_BY_ID', requestBody, { headers })
  }

  // NOT WORKING YET
  // DELETE ADMIN
  UPDATE_ADMIN(admin: Admin): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    console.log('admin to update : ', admin)
    const requestBody = {
      "adminId": admin._id, // The ID of the admin you want to update
      "updateData": {
        "firstname": admin.firstname,
        "lastname": admin.lastname,
        "email": admin.email,
        "phone": admin.phone,
        "permissions": { // The updated permissions of the admin
          "packages": admin.permissions.packages,
          "visa": admin.permissions.visa,
          "recruitment": admin.permissions.recruitment,
          "accounting": admin.permissions.accounting,
          "users": admin.permissions.users,
          "notes": admin.permissions.notes
        }
      }
    }
    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_ADMIN_BY_ID', requestBody, { headers })
  }

  //GET ADMIN BY ID
  GET_ADMIN_BY_ID(ID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": ID
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_PROFILE_BY_ID', requestBody, { headers });
  }

  //GET ADMIN BY SEARCH KEY
  SEARCH_ADMIN(SEARCH_VALUE: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search": SEARCH_VALUE
    };
    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_ADMIN_BY_FIELDS', requestBody, { headers });
  }


  checkPermission(admin: Admin, permissionName: keyof Admin['permissions']): boolean {
    // Replace 'admin' with the actual object representing your logged-in admin
    if (admin.permissions[permissionName] === 'none') {
      return false; // Hide items with 'none' permission
    }
    // Implement logic to check other permissions as needed
    return true; // Show items by default if no specific check is needed
  }

}