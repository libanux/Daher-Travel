import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, effect } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { SearchService } from '../../signals/search.service';
import { GeneralService } from '../../service-folder/general.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  @Input() showDropdowns = true;
  @Input() showTitle = true;

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];

  userArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;
  searchKey: string = '';
  @Input() showPaging: boolean = true;
  @Output() currentPageChoosen = new EventEmitter<number>();
  UsersArrayLength: number = 0;
  constructor(
    private apiService: GeneralService,
    private router: Router,
    private userService: UserService,
    private searchService: SearchService
  ) {

    effect(() => {
      this.searchKey = this.searchService.UserSearchKey();
      this.currentPage = 0;
      this.fetchUsers(this.currentPage);
    });
  }


  ngOnInit(): void {
    this.searchKey = this.searchService.UserSearchKey();
    this.fetchUsers(this.currentPage);
  }

  // Function to fetch users
  fetchUsers(currentPage: number): void {
    this.userService.GET_USERS(currentPage).subscribe({
      next: (response: any) => {
        this.userArray = response.my_Users.first;
        this.UsersArrayLength = Math.ceil(response.my_Users.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; console.log(error); },
      complete: () => { this.showShimmer = false; }
    });
  }


  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.fetchUsers(this.currentPage)
  }

  // Function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number): void {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
