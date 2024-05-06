import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '';
  userArray = signal<any[]>([]);

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl
  }

  //GET USERS
  getUsers(): void {
    const jwt = this.generalService.storedToken;

    if (!jwt) {
      console.error('JWT token not found in local storage');
      return;
    }

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

    this.http.post<any>(this.apiUrl + '/GET_USER_BY_CRITERIA', requestBody, { headers })
      .subscribe(
        (response) => {
          if (response && response.my_Users && Array.isArray(response.my_Users.first)) {
            this.userArray.set([...response.my_Users.first]); 
          } else {
            console.error('Invalid response format - expected my_Users.first to be an array');
          }
        },
        (error) => {
          console.error('Error fetching users:', error);

        }
      );
  }
}
