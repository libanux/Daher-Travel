import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
@Component({
  selector: 'app-website-trans-table',
  templateUrl: './website-trans-table.component.html',
  styleUrl: './website-trans-table.component.css'
})
export class WebsiteTransTableComponent implements OnInit {

  @Input() showDropdowns = true;
  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];
  private apiUrl = '';
  webTranslationArrayLength = 0
  webTranslationArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;

  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService) { }

  ngOnInit(): void {
    this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
        this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }


  receivePageSize($event: any) {
    this.currentPage = $event;
    console.log(this.currentPage)
    this.currentPageChoosen.emit(this.currentPage)
    this.GET_WEB_TRANSLATION(this.currentPage)
  }

  GET_WEB_TRANSLATION(page: number){
    this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(page).subscribe({
      next: (response: any) => {
        this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
        this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }


}
