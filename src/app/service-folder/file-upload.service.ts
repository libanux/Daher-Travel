import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const uploadReq = new HttpRequest('POST', 'https://libanux.xyz/servsmart/api/dataYOUR_UPLOAD_ENDPOINT', formData, {
      reportProgress: true,
    });

    return this.http.request(uploadReq).pipe(
      tap((event: any) => {
        console.log('Event:', event);
      }),
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round((100 * event.loaded) / (event.total ?? 1));
            console.log(`Upload Progress: ${progress}%`);
            return progress;
          case HttpEventType.Response:
            console.log('Upload Complete');
            return 100; // Upload complete
          default:
            return 0; // Initial state or any other event type
        }
      }),
      catchError(error => {
        console.error('Upload Error:', error);
        return throwError(() => error);
      })
    );
  }
}
