import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { TranslationService } from '../../service-folder/translation.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  showShimmer = true;
  translationARRAY = [];
  length = 0;
  currentPage = 0;

  constructor(private signalService : BreadcrumbService, private translationService : TranslationService) { }

  ngOnInit(): void {
    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

    this.routeCurrently.set('Translation')
    this.breadCrumb1.set('')
    this.breadCrumb1Route.set('')
    this.breadCrumb2.set(' / Translation')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')

    this.translationService.GET_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.translationARRAY = response.my_TranslationsOrders.first;
        this.length = response.my_TranslationsOrders.second;
      },
      error: (error) => {this.showShimmer = false; },
      complete: () => {this.showShimmer = false;}
    });

    }
  }
