import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { GeneralService } from './general.service';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService : GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

// get all users per page  
GET_TRANSLATION_PER_PAGE(page_Number:number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

let startRow = page_Number * this.pagingSize
let endRow = this.pagingSize + (page_Number * this.pagingSize)

    // Define the request body
  const requestBody = {
    "owner_ID": 1,
    "original_LANGUAGE": "",
    "translated_LANGUAGE": "",
    "currency": "",
    "status": "",
    "start_ROW": startRow,
    "end_ROW": endRow,
    "total_COUNT": 0,
    "is_EXECUTE_NOW": false
  };

  return this.httpClient.post<any>(this.apiUrl + '/GET_TRANSLATION_ORDER_BY_CRITERIA_ADV', requestBody, { headers });
}

GET_FILES_TRANSLATION_BY_ID(ID : number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

  // Define the request body
  const requestBody = {
    "TRANSLATION_ORDER_ID": ID
  };
  return this.httpClient.post<any>(this.apiUrl + '/GET_ORDER_FILE_BY_TRANSLATION_ORDER_ID_ADV', requestBody, { headers });
}

GET_TRANSLATION_BY_ID(ID : number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

  // Define the request body
  const requestBody = {
    "TRANSLATION_ORDER_ID": ID
  };
  return this.httpClient.post<any>(this.apiUrl + '/GET_TRANSLATION_ORDER_BY_TRANSLATION_ORDER_ID_ADV', requestBody, { headers });
}

GET_PAYMENT_TRANSLATION_BY_ID(ID : number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

  // Define the request body
  const requestBody = {
    "TRANSLATION_ORDER_ID": ID
  };
  return this.httpClient.post<any>(this.apiUrl + '/GET_PAYMENT_BY_TRANSLATION_ORDER_ID', requestBody, { headers });
}

// EDIT_TRANSLATION(translation :any):Observable<any>{
  
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${this.storedToken}`, 
//     'Content-Type': 'application/json' // Set content type to JSON
//   });

//     // Define the request body
//   const requestBody = {
//     "TRANSLATION_ORDER_ID": translation.TRANSLATION_ORDER_ID,
//     "USER_ID":translation.USER_ID,
//     "FILE_ID": translation.FILE_ID,
//     "ORIGINAL_LANGUAGE":translation.ORIGINAL_LANGUAGE,
//     "TRANSLATED_LANGUAGE": translation.TRANSLATED_LANGUAGE,
//     "ORDER_DATE":translation.ORDER_DATE,
//     "DELIVERY_DATE": translation.DELIVERY_DATE,
//     "PRICE": translation.PRICE,
//     "CURRENCY": translation.CURRENCY,
//     "STATUS": translation.STATUS,
//     "SOURCE":translation.SOURCE,
//     "SERVICE_ID":translation.SERVICE_ID,
//     "SUB_SERVICE_ID": translation.SUB_SERVICE_ID,
//     "TYPE_ID":translation.TYPE_ID,
//     "SUB_TYPE_ID": translation.SUB_TYPE_ID,
//     "ENTRY_USER_ID": translation.ENTRY_USER_ID,
//     "ENTRY_DATE":translation.ENTRY_DATE,
//     "OWNER_ID":translation.OWNER_ID,
//   };

//   return this.httpClient.post<any>(this.apiUrl + '/EDIT_TRANSLATION_ORDER', requestBody, { headers });
// }

EDIT_FILE(file :any, userid: any):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
  });

    // Define the request body
  const requestBody = {
    "file_ID": -1,
    "file_NAME": "",
    "file_URL": "",
    "file_SIZE": 0,
    "file_TYPE": "",
    "file_WORD_COUNT": 0,
    "file_DURATION": null,
    "trim_START_TIME": null,
    "trim_END_TIME": null,
    "comment": null,
    "user_ID": userid,
    "entry_USER_ID": userid,
    "time_UPLOAD": "",
    "entry_DATE": "",
    "owner_ID": 1
  };

  const formData = new FormData()
  formData.append('file', file)
  formData.append('i_File', JSON.stringify(requestBody));

  console.log(file)
  console.log(formData)

  return this.httpClient.post<any>(this.apiUrl + '/EDIT_FILE', formData, { headers })

}

// GET ALL WEBSITE TRANSLATIONS (QUOTATIONS) 
GET_WEB_TRANSLATION_PER_PAGE(page_Number:number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

let startRow = page_Number * this.pagingSize
let endRow = this.pagingSize + (page_Number * this.pagingSize)

    // Define the request body
  const requestBody = {
    "OWNER_ID": 1,
    "QUOTE_TYPE": "",
    "SOURCE_LANGUAGE": "",
    "TARGET_LANGUAGE": "",
    "URL_SOURCE": "",
    "QUOTE_STATUS": "",
    "START_ROW": startRow,
    "END_ROW": endRow,
    "TOTAL_COUNT": 0
  };

  return this.httpClient.post<any>(this.apiUrl + '/GET_QUOTE_TRANSLATION_BY_CRITERIA_ADV', requestBody, { headers });
}

// GET ALL WEBSITE TRANSLATIONS (QUOTATIONS) 
GET_WEB_TRANSLATION_BY_ID(translationID: number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

    // Define the request body
  const requestBody = {
    "QUOTE_TRANSLATION_ID":translationID
  };

  return this.httpClient.post<any>(this.apiUrl + '/GET_QUOTE_TRANSLATION_BY_QUOTE_TRANSLATION_ID_ADV', requestBody, { headers });
}




}
