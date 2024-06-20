import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  PageSizing = 10;
  storedToken: string = '';  // Initialize with an empty string
  admin_id: any = 0

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.platformId = platformId;
    if (isPlatformBrowser(platformId)) {
      // runs on client / browser
      const token = localStorage.getItem('TICKET');
      this.storedToken = token !== null ? token : '';

      // admin_id
      this.admin_id = localStorage.getItem('admin_id')
    }
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

export const Date_Filter_Array: any[] = [
  { value: 'all', viewValue: 'All' },
  { value: 'canceled', viewValue: 'Canceled' },
  { value: 'completed', viewValue: 'Completed' },
  { value: 'pending', viewValue: 'Pending' }
];

export const Download_Options: any [] = [
  { value: 'PDF', viewValue: 'PDF' },
  { value: 'Excel', viewValue: 'Excel' },
  { value: 'Image', viewValue: 'Image' }
]

export const Categories : any [] = 
['All', 'Pack','Visa', 'Ticketing']
