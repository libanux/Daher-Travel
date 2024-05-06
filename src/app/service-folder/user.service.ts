import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '';


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiLocalBaseUrl
  }

  getUsers(): Observable<any> {
    const jwt = localStorage.getItem('TICKET');
  
    // Check if jwt is available
    if (!jwt) {
      console.error('JWT token not found in local storage');
    }
  
     // Set headers
     const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    const requestBody = {
      OWNER_ID: 1,
      GOOGLE_U: "",
      FIRST_NAME: "",
      LAST_NAME: "",
      USERNAME: "",
      EMAIL: "",
      PASSWORD: "",
      USER_TYPE_CODE: "",
      USER_LANG_CODE: "",
      START_ROW: 0,
      END_ROW: 10,
      TOTAL_COUNT: 0
    };

    return this.http.post<any>(this.apiUrl + '/GET_USER_BY_CRITERIA', requestBody, { headers });
  }
}
