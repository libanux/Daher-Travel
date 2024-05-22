import { Component } from '@angular/core';

@Component({
  selector: 'app-subtitling-main',
  templateUrl: './subtitling-main.component.html',
  styleUrl: './subtitling-main.component.css'
})
export class SubtitlingMainComponent {
  currentPage = 0
  receivePageSize($event: any) {
    this.currentPage = $event;
  }
  
}
