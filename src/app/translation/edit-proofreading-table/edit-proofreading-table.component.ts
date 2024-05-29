import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { GeneralService } from '../../service-folder/general.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';

@Component({
  selector: 'app-edit-proofreading-table',
  templateUrl: './edit-proofreading-table.component.html',
  styleUrl: './edit-proofreading-table.component.css'
})
export class EditProofreadingTableComponent {
  @Input() showDropdowns = true;
  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  selected_Translation = signal(0);

  editAndProofreadingArrayLength = 0
  editAndProofreadingArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;

  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService,private translationSignal: TranslationSignalService,) { }

  ngOnInit(): void {
    this.selected_Translation = this.translationSignal.selected_Translation_ID;
   this.FETCH_EDITING_AND_PROOFREADING_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_EDITING_AND_PROOFREADING_TRANSLATION(this.currentPage)
  }

  FETCH_EDITING_AND_PROOFREADING_TRANSLATION(page: number){
    this.translationsService.GET_TRANSLATION_ORDER_BY_WHERE_IN_LIST_ADV1(page).subscribe({
      next: (response: any) => {
        this.editAndProofreadingArray = response.my_Translation_Orders.first;
        this.editAndProofreadingArrayLength = Math.ceil(response.my_Translation_Orders.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
