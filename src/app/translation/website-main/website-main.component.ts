import { Component } from '@angular/core';

@Component({
  selector: 'app-website-main',
  templateUrl: './website-main.component.html',
  styleUrl: './website-main.component.css'
})

export class WebsiteMainComponent {
  
  currentPage = 0
  receivePageSize($event: any) {
    this.currentPage = $event;
  }
  

}
