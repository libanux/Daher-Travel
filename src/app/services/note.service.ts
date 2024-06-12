import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { DateSelectedSignal } from '../signals/DateSelectedSignal.service';
import { Note } from '../pages/apps/notes/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = '';

  constructor(private http: HttpClient, private dateSignal: DateSelectedSignal,) {
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

  // GET NOTES
  GET_NOTES(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/GET_ALL_NOTES`, { headers });
  }

  // ADD NOTE
  ADD_NOTE(newNote: Note): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "title":"title",
      "text":newNote.text,
      "status":newNote.status,
      "adminid":newNote.adminid
    };
    return this.http.post<any>(this.apiUrl + '/ADD_NOTE', requestBody, { headers })
  }

  // UPDATE NOTE
  UPDATE_NOTE(editedNote: Note): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": editedNote._id,
      "updateData": {
       "text":editedNote.text,
        "status": editedNote.status,
        "title":editedNote.title
      }

    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_NOTE', requestBody, { headers })
  }


  // DELETE NOTE
  DELETE_NOTE(delNote: Note): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": delNote._id
    };
    return this.http.post<any>(this.apiUrl + '/DELETE_NOTE', requestBody, { headers })
  }



}
