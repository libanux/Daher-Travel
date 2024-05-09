import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { TranslationService } from '../../service-folder/translation.service';
import { ViewedObjectService } from '../../signals/viewed-object.service';

@Component({
  selector: 'app-view-translation',
  templateUrl: './view-translation.component.html',
  styleUrl: './view-translation.component.css'
})
export class ViewTranslationComponent implements OnInit{

  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  selected_Translation =  signal(0);

  translation_ID = 0

  constructor(private viewedObj_Service : ViewedObjectService, private signalService : BreadcrumbService, private translationService : TranslationService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('View Translation')
  this.breadCrumb1.set('/ Translation')
  this.breadCrumb1Route.set('/translation')
  this.breadCrumb2.set(' / View Translation')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')

  this.selected_Translation = this.viewedObj_Service.selected_Translation

    console.log(this.selected_Translation())

  this.translationService.GET_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: string) => {
      console.log(response)
        },
    error: (error) => {console.log(error)},
    complete: () => {}
  });
  
}
}
