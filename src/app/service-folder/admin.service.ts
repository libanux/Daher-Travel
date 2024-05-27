import { Injectable } from '@angular/core';
import { SearchService } from '../signals/search.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { environment } from '../../enviroments/enviroment';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';
  searchKey: string = ''
  constructor(private httpClient: HttpClient, private generalService: GeneralService, private searchService: SearchService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }
  //GET USERS
  GET_ADMINS(page_Number: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const startRow = page_Number * this.pagingSize;
    const endRow = this.pagingSize + (page_Number * this.pagingSize);

    const requestBody = {
      "OWNER_ID": 1,
      "GOOGLE_U": "",
      "FIRST_NAME": this.searchService.AdminSearchKey(),
      "LAST_NAME": "",
      "USERNAME": this.searchService.AdminSearchKey(),
      "EMAIL": "",
      "PASSWORD": "",
      "USER_TYPE_CODE": "001",
      "USER_LANG_CODE": "",
      "START_ROW": startRow,
      "END_ROW": endRow,
      "TOTAL_COUNT": 0
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_USER_BY_CRITERIA', requestBody, { headers });
  }


  //GET ADMIN BY ID
  GET_ADMIN_BY_ID(userID: number): Observable<any> {
    const jwt = this.generalService.storedToken;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      USER_ID: userID
    };

    return this.httpClient.post<any>(this.apiUrl + '/GET_USER_BY_USER_ID', requestBody, { headers });
  }

  // ADD USER
  ADD_ADMIN(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      USER_ID: user.user_ID,
      OWNER_ID: user.owner_ID,
      GOOGLE_U: user.google_U,
      FIRST_NAME: user.first_NAME,
      LAST_NAME: user.last_NAME,
      USERNAME: user.username,
      EMAIL: user.email,
      PASSWORD: user.password,
      USER_TYPE_CODE: "001",
      USER_LANG_CODE: user.user_LANG_CODE,
      IS_ACTIVE: user.is_ACTIVE,
      IS_DELETED: user.is_DELETED,
      PROFILE_COMPLETED: user.profile_COMPLETED,
      ENTRY_DATE: user.entry_DATE
    };
    return this.httpClient.post<any>(this.apiUrl + '/EDIT_USER', requestBody, { headers })
  }

}
