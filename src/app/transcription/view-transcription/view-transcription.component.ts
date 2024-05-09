import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
@Component({
  selector: 'app-view-transcription',
  templateUrl: './view-transcription.component.html',
  styleUrls: ['./view-transcription.component.css']
})
export class ViewTranscriptionComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  
  constructor( private route: ActivatedRoute, private signalService : BreadcrumbService) { }

ngOnInit(): void {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('Transcription')
  this.breadCrumb1.set(' / Transcription')
  this.breadCrumb1Route.set('/transcription')
  this.breadCrumb2.set(' / View Transcription')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')

  this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
    const transcriptionID = params['id'];
  });
  
}
}