import { Component, signal } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { WebsiteTranslation } from '../../classes/Website-Translation';
import { User } from '../../classes/User';

@Component({
  selector: 'app-website-translation',
  templateUrl: './website-translation.component.html',
  styleUrl: './website-translation.component.css'
})
export class WebsiteTranslationComponent  {

  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');
  
  selectedTranslation : WebsiteTranslation;
  translationUser: User;
  translationID: number = 0;
  userChanged: boolean = false;
  isEditing: boolean = false;

  constructor(private translationService: TranslationService, private route: ActivatedRoute, private router: Router, private signalService: BreadcrumbService) {
    this.selectedTranslation = new WebsiteTranslation();
    this.translationUser = new User();
  }

  ngOnInit(): void {

    this.routeCurrently = this.signalService.routeCurrently
    this.breadCrumb1 = this.signalService.breadCrumb1
    this.breadCrumb1Route = this.signalService.breadCrumb1Route
    this.breadCrumb2 = this.signalService.breadCrumb2
    this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
    this.BCbeforeLastOne = this.signalService.BCbeforeLastOne
  
    this.routeCurrently.set('Edit Translation')
    this.breadCrumb1.set(' / Website Translation')
    this.breadCrumb1Route.set('/translation')
    this.breadCrumb2.set(' / Edit Translation')
    this.BCbeforeLastOneRoute.set('')
    this.BCbeforeLastOne.set('')
    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.translationID = params['id'];
    });

    this.translationService.GET_WEB_TRANSLATION_BY_ID(this.translationID).subscribe({
      next: (response: any) => {
        this.selectedTranslation = response.my_QUOTE_TRANSLATION;
        this.translationUser = response.my_QUOTE_TRANSLATION.my_USER;
      },
      error: (error: any) => { console.log(error); },
      complete: () => { }
    });
  }


    //GO BACK FUNCTION
    back() {
      this.router.navigate(['/website-translation']);
    }
}


