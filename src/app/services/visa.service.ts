import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';
import { VisaClass } from '../classes/visaClass';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private apiUrl = '';
  private pagingSize = 10;

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
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

  //GET ALL VISA
  GET_ALL_VISA(currentPage: number, pageSize: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "page": currentPage,
      "pageSize": pageSize
    }

    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_VISA', requestBody, { headers });
  }

  //UPDATE VISA
  UPDATE_VISA(VISA: VisaClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "id": VISA._id,
      "updateData": {
        "customerName": VISA.customer.name,
        "country": VISA.country,
        "phoneNumber": VISA.customer.phoneNumber,
        "note": VISA.note,
        "sell": VISA.sell,
        "status": VISA.status,
        "type": VISA.type,
      }
    };


    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_VISA', requestBody, { headers });
  }

  //ADD VISA
  ADD_VISA(VISA: VisaClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    // Define the request body
    const requestBody = {
      "customerId": VISA.customer.id,
      "customerName": VISA.customer.name,
      "phoneNumber": VISA.customer.phoneNumber,
      "country": VISA.country,
      "note": VISA.note,
      "sell": VISA.sell,
      "status": VISA.status,
      "type": VISA.type,
    };

    console.log(requestBody)

    return this.httpClient.post<any>(this.apiUrl + '/ADD_VISA', requestBody, { headers });
  }

  //DELETE VISA
  DELETE_VISA(ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = { "id": ID };

    return this.httpClient.post<any>(this.apiUrl + '/DELETE_VISA', requestBody, { headers });
  }

  FILTER_AND_SEARCH_VISAS(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search": SEARCK_KEY,
      "filterType": FILTER_TYPE,
      "startDate": START_DATE,
      "endDate": END_DATE,
      "status": STATUS,
      "page": CURRENT_PAGE,
      "pageSize": PAGE_SIZE
    };

    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_VISAS', requestBody, { headers });
  }

  DOWNLOAD_AS(VALUE: string): Observable<any> {
    // if(VALUE == 'PDF'){
    //   return this.httpClient.get<any>(this.apiUrl + '/EXPORT_VISAS_TO_EXCEL');
    // }

    // else {
    //   console.log('here')
    return this.httpClient.get<any>(this.apiUrl + '/EXPORT_VISAS_TO_EXCEL');
  }
  // }



  getData() {
    const url = 'https://api.dahertravellb.com/DaherTravel/api/EXPORT_VISAS_TO_EXCEL';

    this.httpClient.get(url, { responseType: 'blob', observe: 'response' })
      .subscribe(
        (response: HttpResponse<Blob>) => {
          const contentDisposition = response.headers.get('Content-Disposition');
          const contentType = response.headers.get('Content-Type') || 'application/octet-stream'; // Default to a generic type if Content-Type is null

          const blob = new Blob([response.body as BlobPart], { type: contentType });

          // Create a link element and trigger the download
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(blob);
          downloadLink.download = this.getFileNameFromContentDisposition(contentDisposition);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP Error:', error);
          console.error('Server error message:', error.error);
          // Handle HTTP request error, e.g., show an error message to the user
        }
      );
  }

  private getFileNameFromContentDisposition(contentDisposition: string | null): string {
    if (!contentDisposition) {
      return 'downloadedFile.xlsx'; // Provide a default filename if Content-Disposition is missing
    }
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'downloadedFile.xlsx';
  }
}
