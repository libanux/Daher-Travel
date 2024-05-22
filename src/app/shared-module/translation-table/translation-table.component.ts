import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ViewedObjectService } from '../../signals/viewed-object.service';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationService } from '../../service-folder/translation.service';

@Component({
  selector: 'app-translation-table',
  templateUrl: './translation-table.component.html',
  styleUrls: ['./translation-table.component.css']
})
export class TranslationTableComponent implements OnInit{

  @Input() showform = false;
  @Input() showPaging: boolean = true ;
  @Input() currentPage = 0;

  translationArray: any [] = [];
  translationArrayLength= 0;
  showShimmer: boolean = true;

  selected_Translation =  signal(0);

  status: string = "ACCEPTED"

  dropTitle1: string = 'SPEAKERS';
  dropTitle2: string = 'TYPE';
  dropTitle3: string = 'STATUS';
  dropOptions1: string[] = ["All", "1-2", "3 or more"];
  dropOptions2: string[] = ["All", "Human", "AI"];
  dropOptions3: string[] = ["All", "ACCEPTED", "IN PROGRESS"];

  constructor(private apiService : GeneralService, private translationService : TranslationService, private signalService: ViewedObjectService, private router: Router) { }
 
  ngOnInit(): void {
    this.selected_Translation = this.signalService.selected_Translation;

    this.translationService.GET_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.translationArray = response.my_TranslationsOrders.first;
        this.translationArrayLength = Math.ceil(response.my_TranslationsOrders.second / this.apiService.PageSizing);
      },
      error: (error) => {this.showShimmer = false; },
      complete: () => {this.showShimmer = false;}
    });

  }
  
  @Output() currentPageChoosen = new EventEmitter<number>();

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
  }
  
  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
