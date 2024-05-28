import { Component, EventEmitter, Input, OnInit, Output, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ViewedObjectService } from '../../signals/viewed-object.service';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationService } from '../../service-folder/translation.service';
import { DropdownService } from '../../signals/dropdown.service';
@Component({
  selector: 'app-document-trans-table',
  templateUrl: './document-trans-table.component.html',
  styleUrl: './document-trans-table.component.css'
})
export class DocumentTransTableComponent implements OnInit {

  @Input() showform = false;
  @Input() showPaging: boolean = true;
  @Input() currentPage = 0;

  translationArray: any[] = [];
  translationArrayLength = 0;
  showShimmer: boolean = true;

  selected_Translation = signal(0);

  status: string = "ACCEPTED"


  dropTitle1: string = 'Original';
  dropTitle2: string = 'Translated';
  dropTitle3: string = 'Status';

  dropOptions1: string[] = ["All", "Arabic", "English", "French"];
  dropOptions2: string[] = ["All", "Arabic", "English", "French"];
  dropOptions3: string[] = ["All", "Completed", "Inprogress", "Pending"];

  filter1: string = ''
  filter2: string = ''
  filter3: string = ''

  constructor(private apiService: GeneralService, private dropService: DropdownService, private translationService: TranslationService, private signalService: ViewedObjectService, private router: Router) {
    effect(() => {
      this.filter1 = this.dropService.DropDown1();
      this.filter2 = this.dropService.DropDown2();
      this.filter3 = this.dropService.DropDown3();
      this.fetchTranslations();
    });
  }

  ngOnInit(): void {
    this.selected_Translation = this.signalService.selected_Translation_ID;
    this.fetchTranslations();
  }


  fetchTranslations(): void {
    this.translationService.GET_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.translationArray = response.my_TranslationsOrders.first;
        this.translationArrayLength = Math.ceil(response.my_TranslationsOrders.second / this.apiService.PageSizing);
      },
      error: (error) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }

  @Output() currentPageChoosen = new EventEmitter<number>();

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage);
    this.fetchTranslations();
  }


  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
