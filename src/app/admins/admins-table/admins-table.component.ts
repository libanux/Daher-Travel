import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrl: './admins-table.component.css'
})
export class AdminsTableComponent {
 
  @Input() showTitle = true;
  @Output() currentPageChoosen = new EventEmitter<number>();

  currentPage = 0;
  ArrayLength = 0;
  showShimmer = false;
  status: string = "ACCEPTED"

 Admins_Array = [
    { id: 1, GOOGLE_U: null, email: 'user1@example.com', password: 'password1', IS_ACTIVE: true, FirstNAME: 'John', lastName: 'Doe', datetimeCreated: '2024-04-16T08:00:00Z' },
    { id: 2, GOOGLE_U: null, email: 'user2@example.com', password: 'password2', IS_ACTIVE: true, FirstNAME: 'Jane', lastName: 'Smith', datetimeCreated: '2024-04-16T08:10:00Z' },
    { id: 3, GOOGLE_U: null, email: 'user3@example.com', password: 'password3', IS_ACTIVE: true, FirstNAME: 'Alice', lastName: 'Johnson', datetimeCreated: '2024-04-16T08:20:00Z' },
    { id: 4, GOOGLE_U: null, email: 'user4@example.com', password: 'password4', IS_ACTIVE: true, FirstNAME: 'Bob', lastName: 'Brown', datetimeCreated: '2024-04-16T08:30:00Z' },
    { id: 5, GOOGLE_U: null, email: 'user5@example.com', password: 'password5', IS_ACTIVE: true, FirstNAME: 'Eva',lastName: 'Williams', datetimeCreated: '2024-04-16T08:40:00Z' }
  ];
  
constructor(private router: Router) { }

ngOnInit(): void {
  this.FETCH_ADMINS(0);
}
 
receivePageSize($event: any) {
  this.currentPage = $event;
  this.currentPageChoosen.emit(this.currentPage)
  this.FETCH_ADMINS(this.currentPage)
}
 
FETCH_ADMINS(page: number){
    //  this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(page).subscribe({
    //    next: (response: any) => {
    //      this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
    //      this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
    //    },
    //    error: (error: any) => { this.showShimmer = false; },
    //    complete: () => { this.showShimmer = false; }
    //  });
}

// function for viewing a specific item
moveToRouteWithIndex(route: string, id: number) {
  this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    window.scrollTo(0, 0);
  });
}

// function for routing
moveToRoute(route: string) {
  this.router.navigate([route]).then(() => {window.scrollTo(0, 0);});
}

}

