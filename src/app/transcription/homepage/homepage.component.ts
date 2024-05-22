import { Component } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  currentPage = 0
  receivePageSize($event: any) {
    this.currentPage = $event;
  }
  
}
