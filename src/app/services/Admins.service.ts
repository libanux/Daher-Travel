import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { environment } from 'src/enviroment/enviroment';
import { SearchService } from '../signals/search.service';
import { Admin } from '../classes/admin.class';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';
  searchKey: string = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService, private searchService: SearchService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

  //GET USERS
  GET_ALL_ADMINS(currentPage: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "page": currentPage,
      "pageSize": pageSize
    }


    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_ADMINS',requestBody, { headers });
  }

  // ADD ADMIN
  ADD_ADMIN(admin: Admin): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
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

    console.log(requestBody)

    return this.httpClient.post<any>(this.apiUrl + '/SIGN_UP', requestBody, { headers })
  }

  // DELETE ADMIN
  DELETE_ADMIN(ID: string): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "adminId": ID
    }

    return this.httpClient.post<any>(this.apiUrl + '/DELETE_ADMIN_BY_ID', requestBody, { headers })
  }

  // DELETE ADMIN
  UPDATE_ADMIN(admin: Admin): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

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
          "accounting":admin.permissions.accounting,
          "users":admin.permissions.users,
          "notes":admin.permissions.notes
        }
      }
    }

    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_ADMIN_BY_ID', requestBody, { headers })
  }

  //GET USER BY ID
  GET_ADMIN_BY_ID(ID: string): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": ID
    };

    return this.httpClient.post<any>(this.apiUrl + '/GET_PROFILE_BY_ID', requestBody, { headers });
  }

  //GET USER BY ID
  SEARCH_ADMIN(SEARCH_VALUE: string): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search":SEARCH_VALUE
    };

    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_ADMIN_BY_FIELDS', requestBody, { headers });
  }

}