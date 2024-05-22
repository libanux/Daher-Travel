import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrl: './admins-table.component.css'
})
export class AdminsTableComponent {
 
  @Input() showDropdowns = true;
  @Input() showTitle = true;

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];

 userArray = [
    { id: 1, GOOGLE_U: null, email: 'user1@example.com', password: 'password1', IS_ACTIVE: true, FirstNAME: 'John', lastName: 'Doe', datetimeCreated: '2024-04-16T08:00:00Z' },
    { id: 2, GOOGLE_U: null, email: 'user2@example.com', password: 'password2', IS_ACTIVE: true, FirstNAME: 'Jane', lastName: 'Smith', datetimeCreated: '2024-04-16T08:10:00Z' },
    { id: 3, GOOGLE_U: null, email: 'user3@example.com', password: 'password3', IS_ACTIVE: true, FirstNAME: 'Alice', lastName: 'Johnson', datetimeCreated: '2024-04-16T08:20:00Z' },
    { id: 4, GOOGLE_U: null, email: 'user4@example.com', password: 'password4', IS_ACTIVE: true, FirstNAME: 'Bob', lastName: 'Brown', datetimeCreated: '2024-04-16T08:30:00Z' },
    { id: 5, GOOGLE_U: null, email: 'user5@example.com', password: 'password5', IS_ACTIVE: true, FirstNAME: 'Eva',lastName: 'Williams', datetimeCreated: '2024-04-16T08:40:00Z' }
  ];
  
  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {

  }

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

  // function for viewing a specific item
moveToRoute(route: string) {
  this.router.navigate([route]).then(() => {window.scrollTo(0, 0);});
}

}

