import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment.prod';
import { Package } from '../classes/package.class';
import { SearchService } from '../signals/search.service';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = '';

  constructor(private http: HttpClient, private searchService: SearchService) {
    this.apiUrl = environment.apiLocalBaseUrl;
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

  // GET PACKAGES
  GET_PACKAGES(page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "pageSize": size,
      "page": page
    };

    return this.http.post<any>(this.apiUrl + '/GET_ALL_PACKAGES', requestBody, { headers })
  }

  // ADD PACKAGE
  ADD_PACKAGE(newPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "customerId": newPackage.customer.id,
      "customerName": newPackage.customer.name,
      "destination": newPackage.destination,
      "numberOfPeople": newPackage.numberOfPeople,
      "duration": newPackage.duration,
      "cost": newPackage.cost,
      "source": newPackage.source,
      "hotels": newPackage.hotels,
      "status": newPackage.status,
      "sell": newPackage.sell,
      "note": newPackage.note
    };
    console.log("Request pack",requestBody)
    return this.http.post<any>(this.apiUrl + '/ADD_PACKAGE', requestBody, { headers })
  }

  // UPDATE PACKAGE
  UPDATE_PACKAGE(editedPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "packageId": editedPackage._id,
        "customerId": editedPackage.customer.id,
        "customerName": editedPackage.customer.name,
        "destination": editedPackage.destination,
        "numberOfPeople": editedPackage.numberOfPeople,
        "duration": editedPackage.duration,
        "cost": editedPackage.cost,
        "source": editedPackage.source,
        "hotels": editedPackage.hotels,
        "status": editedPackage.status,
        "sell": editedPackage.sell,
        "note": editedPackage.note


    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_PACKAGE', requestBody, { headers })
  }


  // DELETE PACKAGE
  DELETE_PACKAGE(delPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": delPackage._id
    };
    return this.http.post<any>(this.apiUrl + '/DELETE_PACKAGE', requestBody, { headers })
  }

  // FILTER PACKAGE BY DATE
  SEARCH_FILTER_PACKAGE(pageSize:number, currentPage: number,searchkey:string,filterType: string ,statusValue: string, startDate: string , endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search": searchkey,
      "filterType":filterType,
      "startDate": startDate,
      "endDate": endDate,
      "status": statusValue,
      "page": currentPage,
      "pageSize": pageSize
    };
    return this.http.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_PACKAGES', requestBody, { headers })
  }

  // FILTER PACKAGE BY DATE
  FILTER_PACKAGES_BY_STATUS(pageSize: number, currentPage: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "status": status,
      "page": currentPage,
      "pageSize": pageSize
    };
    return this.http.post<any>(this.apiUrl + '/FILTER_PACKAGES_BY_STATUS', requestBody, { headers })
  }


  // FILTER PACKAGE BY DATE
  FILTER_PACKAGE_BY_DATE(filter: string, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "filterType": filter,
      "startDate": startDate,
      "endDate": endDate
    };
    return this.http.post<any>(this.apiUrl + '/FILTER_PACKAGES_BY_DATE', requestBody, { headers })
  }
}
