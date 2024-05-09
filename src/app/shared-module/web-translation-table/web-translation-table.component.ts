import { Component, Input } from '@angular/core';

import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';

@Component({
  selector: 'app-web-translation-table',
  templateUrl: './web-translation-table.component.html',
  styleUrl: './web-translation-table.component.css'
})
export class WebTranslationTableComponent {

  @Input() showDropdowns = true;
  @Input() showTitle = true;

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];


  constructor(private router: Router, private translationsService: TranslationService) { }

  webTranslationArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;

  ngOnInit(): void {
    this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
        console.log("RESPONSE:",response)
      },
      error: (error: any) => { this.showShimmer = false; console.log(error); },
      complete: () => { this.showShimmer = false; }
    });
  }

  // //ADD USER FUNCTION
  // addUser() {
  //   this.router.navigate(['/users/add']);
  // }

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
