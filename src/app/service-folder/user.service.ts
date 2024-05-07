import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable, catchError, throwError } from 'rxjs';
import { GeneralService } from './general.service';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userArray = signal<any[]>([]);
  selectedUser = signal(new User());
  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService : GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }


  //GET USERS
  getUsers(page_Number: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`, 
      'Content-Type': 'application/json'
    });

    const startRow = page_Number * this.pagingSize;
    const endRow = this.pagingSize + (page_Number * this.pagingSize);

    const requestBody = {
      "OWNER_ID": 1,
      "GOOGLE_U": "",
      "FIRST_NAME": "",
      "LAST_NAME": "",
      "USERNAME": "",
      "EMAIL": "",
      "PASSWORD": "",
      "USER_TYPE_CODE": "",
      "USER_LANG_CODE": "",
      "START_ROW": startRow,
      "END_ROW": endRow,
      "TOTAL_COUNT": 0
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_USER_BY_CRITERIA', requestBody, { headers });
  }


   //GET USER BY ID
   getUserByID(userID: number): Observable<any> {
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
  addUser(user:User): Observable<any> {
    const requestBody = {
      USER_ID: user.user_ID,
      OWNER_ID: user.owner_ID,
      GOOGLE_U: user.google_U,
      FIRST_NAME: user.first_NAME,
      LAST_NAME: user.last_NAME,
      USERNAME: user.username,
      EMAIL: user.email,
      PASSWORD: user.password,
      USER_TYPE_CODE: user.user_TYPE_CODE,
      USER_LANG_CODE:user.user_LANG_CODE ,
      IS_ACTIVE: user.is_ACTIVE,
      IS_DELETED: user.is_DELETED,
      PROFILE_COMPLETED:user.profile_COMPLETED ,
      ENTRY_DATE: user.entry_DATE
    };
    return this.httpClient.post<any>(this.apiUrl + '/SIGN_UP', requestBody)
  }
}
