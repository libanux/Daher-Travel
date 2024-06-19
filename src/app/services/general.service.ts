import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService  {

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

export const Month_Filter_Array : any [] = [
  { value: 'today', viewValue: 'Today' },
  { value: 'yesterday', viewValue: 'Yesterday' },
  { value: 'thisWeek', viewValue: 'This Week' },
  { value: 'thisMonth', viewValue: 'This Month' },
  { value: 'thisYear', viewValue: 'This Year' },
  { value: 'Calendar', viewValue: 'Custom' }
];
