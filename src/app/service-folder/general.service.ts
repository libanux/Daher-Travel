import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService  {

  PageSizing = 5;
  storedToken: string = '';  // Initialize with an empty string

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.platformId = platformId;
    if (isPlatformBrowser(platformId)) {
      // runs on client / browser
      const token = localStorage.getItem('TICKET');
      this.storedToken = token !== null ? token : '';
      // console.log("prints only in browser not in server");
    }
    // if (isPlatformServer(platformId)) {
    //   // runs on server / node
    //   console.log("prints only in server not in browser");
    // }
  }


}
