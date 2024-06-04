import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private storedToken = '';

  constructor( private generalService : GeneralService, private http: HttpClient) { 
    this.storedToken = this.generalService.storedToken
  }

  uploadFile(file: File, user_ID:number): Observable<number> {
    console.log(' file recieved from the coponent : ',file)

    // const formData = new FormData();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`, 
    });
  
    // Define the request body
  const requestBody = {
    "file_ID": -1,
    "file_NAME": file.name,
    "file_URL": "",
    "file_SIZE": file.size,
    "file_TYPE": file.type,
    "file_WORD_COUNT": 0,
    "file_DURATION": null,
    "trim_START_TIME": null,
    "trim_END_TIME": null,
    "comment": null,
    "user_ID": user_ID,
    "entry_USER_ID": user_ID,
    "time_UPLOAD": "",
    "entry_DATE": "",
    "owner_ID": 1
  };

  const formData = new FormData()
  // formData.append('file', file)
  formData.append('file', file, file.name);
  formData.append('i_File', JSON.stringify(requestBody));

  const uploadReq = new HttpRequest('POST', 'https://libanux.xyz/servsmart/api/data/EDIT_FILE', formData, {
    headers: headers, // Pass your headers here
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
        // return throwError(() => error);
      })
    );
  }
}
