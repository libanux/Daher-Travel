import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

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
