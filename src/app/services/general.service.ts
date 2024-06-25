import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  PageSizing = 10;
  storedToken: string = '';  // Initialize with an empty string
  admin_id: any = 0

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private httpClient: HttpClient) {
    this.platformId = platformId;
    if (isPlatformBrowser(platformId)) {
      // runs on client / browser
      const token = localStorage.getItem('TICKET');
      this.storedToken = token !== null ? token : '';

      // admin_id
      this.admin_id = localStorage.getItem('admin_id')
    }
  }

  // Function to format date
  FORMAT_DATE_WITH_HOUR(dateString: string): string {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC' // Optional: Adjust to your timezone
    };

    return dateObj.toLocaleString('en-US', options);
  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
    const day = ('0' + date.getDate()).slice(-2);

    // Return the formatted date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }

  // function to make a text smaller in length 
  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }
  //GET THE STATUS CLASS
  GET_STATUS_CLASS(status: string, pending: string, completed:string, rejected:string): string {
    switch (status) {
      case pending:
        return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case completed:
        return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case rejected:
        return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      default:
        return '';
    }
  }

  GENERATE_SHIMMER_ROWS_COUNT(count: number): string[] {
    return Array.from({ length: count }, (_, index) => (index + 1).toString());
  }

  getData(urlString: string) {
    const url = `https://api.dahertravellb.com/DaherTravel/api/${urlString}`;

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

export const Month_Filter_Array: any[] = [
  { value: 'today', viewValue: 'Today' },
  { value: 'yesterday', viewValue: 'Yesterday' },
  { value: 'thisWeek', viewValue: 'This Week' },
  { value: 'thisMonth', viewValue: 'This Month' },
  { value: 'thisYear', viewValue: 'This Year' },
  { value: 'Calendar', viewValue: 'Custom' }
];


export const Reports_Month_Filter_Array: any[] = [
  { value: 'thisMonth', viewValue: 'This Month' },
  { value: 'lastMonth', viewValue: 'Last Month' },
  { value: 'lastSixMonth', viewValue: 'Last 6 Month' },
  { value: 'thisYear', viewValue: 'This Year' },
  { value: 'Calendar', viewValue: 'Custom' }
];

export const Date_Filter_Array: any[] = [
  { value: '', viewValue: 'All' },
  { value: 'canceled', viewValue: 'Canceled' },
  { value: 'completed', viewValue: 'Completed' },
  { value: 'pending', viewValue: 'Pending' }
];

export const Download_Options: any[] = [
  { value: 'PDF', viewValue: 'PDF' },
  { value: 'Excel', viewValue: 'Excel' }
]

export const Categories: any[] =
  ['All', 'Pack', 'Visa', 'Ticketing']

  
