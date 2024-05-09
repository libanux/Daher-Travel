import { Component, Input } from '@angular/core';

import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { Router } from '@angular/router';

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

  user!: User

  constructor(private router: Router, private userService: UserService) { }

  userArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;
  ngOnInit(): void {
    this.userService.GET_USERS(this.currentPage).subscribe({
      next: (response: any) => {
        this.userArray = response.my_Users.first;
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
