import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService : GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;

    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

  
// get all users per page  
GET_PAYMENTS_PER_PAGE(page_Number:number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

let startRow = page_Number * this.pagingSize
let endRow = this.pagingSize + (page_Number * this.pagingSize)

    // Define the request body
  const requestBody = {
    "OWNER_ID": 1,
    "PAYMENT_METHOD": "",
    "START_ROW": startRow,
    "END_ROW": endRow,
    "TOTAL_COUNT": 0
  };

  return this.httpClient.post<any>(`${this.apiUrl}/GET_PAYMENT_BY_CRITERIA`, requestBody, { headers }).pipe(
    retry(1),
    catchError((error: HttpErrorResponse) => {
      if(error.error.exceptionCode != ''){
        // this.subjectsService.sendAlertData(error.error.exceptionMsg, true);
      }

      else{
        // this.subjectsService.sendAlertData('Error', true);
      }
      return throwError(() => new Error(error.error.data.error));
    }))
}
}
