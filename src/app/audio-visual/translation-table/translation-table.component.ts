import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
@Component({
  selector: 'app-translation-table',
  templateUrl: './translation-table.component.html',
  styleUrl: './translation-table.component.css'
})
export class TranslationTableComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  status: string = "ACCEPTED"

  private apiUrl = '';
  Array_Length = 0
  Translation_Array: any[] = [];
  showShimmer: boolean = false;
  currentPage = 0;

  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService) { }

  ngOnInit(): void {
   this.FETCH_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    console.log(this.currentPage)
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_TRANSLATION(this.currentPage)
  }

  FETCH_TRANSLATION(page: number){
    // this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(page).subscribe({
    //   next: (response: any) => {
    //     this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
    //     this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
    //   },
    //   error: (error: any) => { this.showShimmer = false; },
    //   complete: () => { this.showShimmer = false; }
    // });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}