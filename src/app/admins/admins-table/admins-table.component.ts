import { ChangeDetectorRef, Component, EventEmitter, Input, Output, effect } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../signals/search.service';
import { AdminService } from '../../service-folder/admin.service';
import { GeneralService } from '../../service-folder/general.service';
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
  status: string = "ACCEPTED"
  Admins_Array: any[] = [];
  showShimmer: boolean = true;
  searchKey: string = '';
  @Input() showPaging: boolean = true;
  AdminsArrayLength: number = 0;
  
constructor(private router: Router, private searchService: SearchService, private adminsService:AdminService, private apiService: GeneralService) {
  effect(() => {
    this.searchKey = this.searchService.AdminSearchKey();
    this.currentPage = 0;
    this.FETCH_ADMINS(this.currentPage);
  });
 }

ngOnInit(): void {
  this.searchKey = this.searchService.AdminSearchKey();
  this.FETCH_ADMINS(this.currentPage);
}
 

 
  // FETCH ADMINS
  FETCH_ADMINS(currentPage: number): void {
    this.adminsService.GET_ADMINS(currentPage).subscribe({
      next: (response: any) => {
        this.Admins_Array = response.my_Users.first;
        this.AdminsArrayLength = Math.ceil(response.my_Users.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; console.error(error); },
      complete: () => { this.showShimmer = false; }
    });
  }

  
//RECIVE PAGE SIZE
receivePageSize($event: any) {
  this.currentPage = $event;
  this.currentPageChoosen.emit(this.currentPage)
  this.FETCH_ADMINS(this.currentPage)
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

