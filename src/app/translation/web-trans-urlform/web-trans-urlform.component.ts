import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/User';
import { WebsiteTranslation } from '../../classes/Website-Translation';
import { TranslationService } from '../../service-folder/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';

@Component({
  selector: 'app-web-trans-urlform',
  templateUrl: './web-trans-urlform.component.html',
  styleUrl: './web-trans-urlform.component.css'
})
export class WebTransUrlformComponent implements OnInit{
 
  selectedTranslation : WebsiteTranslation;
  translationUser: User;
  translationID: number = 0;


  constructor(private translationService: TranslationService, private route: ActivatedRoute) {
    this.selectedTranslation = new WebsiteTranslation();
    this.translationUser = new User();
  }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.translationID = params['id'];
    });
    this.translationService.GET_WEB_TRANSLATION_BY_ID(this.translationID).subscribe({
      next: (response: any) => {
        this.selectedTranslation = response.my_QUOTE_TRANSLATION;
        this.translationUser = response.my_QUOTE_TRANSLATION.my_USER;
        console.log("RESPONSE:", response)
     
      },
      error: (error: any) => { console.log(error); 
        console.log("Selected trans", this.selectedTranslation)
      },
      complete: () => { }
    });
  }

}
