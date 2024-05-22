import { Component } from '@angular/core';

@Component({
  selector: 'app-transcription-main',
  templateUrl: './transcription-main.component.html',
  styleUrl: './transcription-main.component.css'
})
export class TranscriptionMainComponent {
  currentPage = 0
  receivePageSize($event: any) {
    this.currentPage = $event;
  }
  

}
