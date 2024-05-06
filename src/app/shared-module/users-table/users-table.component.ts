import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../service-folder/user.service';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
 
  @Input() showDropdowns = true;
  @Input() showTitle = true;

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];

//  userArray = [
//     { id: 1, GOOGLE_U: null, email: 'user1@example.com', password: 'password1', IS_ACTIVE: true, FirstNAME: 'John', lastName: 'Doe', datetimeCreated: '2024-04-16T08:00:00Z' },
//     { id: 2, GOOGLE_U: null, email: 'user2@example.com', password: 'password2', IS_ACTIVE: true, FirstNAME: 'Jane', lastName: 'Smith', datetimeCreated: '2024-04-16T08:10:00Z' },
//     { id: 3, GOOGLE_U: null, email: 'user3@example.com', password: 'password3', IS_ACTIVE: true, FirstNAME: 'Alice', lastName: 'Johnson', datetimeCreated: '2024-04-16T08:20:00Z' },
//     { id: 4, GOOGLE_U: null, email: 'user4@example.com', password: 'password4', IS_ACTIVE: true, FirstNAME: 'Bob', lastName: 'Brown', datetimeCreated: '2024-04-16T08:30:00Z' },
//     { id: 5, GOOGLE_U: null, email: 'user5@example.com', password: 'password5', IS_ACTIVE: true, FirstNAME: 'Eva',lastName: 'Williams', datetimeCreated: '2024-04-16T08:40:00Z' }
//   ];

  constructor(private cdr: ChangeDetectorRef, private router: Router,private userService: UserService) { }

  userArray: any[] = [];
  getUsersSubscription!: Subscription;



  ngOnInit(): void {
    const jwt = localStorage.getItem('TICKET');
    if (jwt) {
      this.getUsersSubscription = this.userService.getUsers().subscribe(
        (response) => {
          // Assuming your response is an array of users, you can assign it to userArray
          console.log("users",response)
          if (response && response.my_Users && Array.isArray(response.my_Users.first)) {
            this.userArray = response.my_Users.first;
          } else {
            console.error('Invalid response format - expected my_Users.first to be an array');
          }
        },
        (error) => {
          console.error('Error fetching users', error);
        }
      );
    } else {
      console.error('JWT token not found in local storage');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

