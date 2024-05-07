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


  constructor(private cdr: ChangeDetectorRef, private router: Router,private userService: UserService) { }

  userArray: any[] = [];


  ngOnInit(): void {
    this.userService.getUsers(); 
    this.userArray = this.userService.userArray(); 
    console.log(this.userArray); 
  }

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    console.log("Raw id value:", id);
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

