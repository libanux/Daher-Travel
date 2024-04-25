import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-transcription',
  templateUrl: './view-transcription.component.html',
  styleUrls: ['./view-transcription.component.css']
})
export class ViewTranscriptionComponent implements OnInit{

  constructor( private route: ActivatedRoute, private router: Router) { }

ngOnInit(): void {
  this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
    const transcriptionID = params['id'];
  });
  
}
}