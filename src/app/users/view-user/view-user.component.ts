import { Component, OnInit, effect } from '@angular/core';
import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  selectedUser !: User
  userId: number = 0;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });

    this.userService.getUserByID(this.userId).subscribe({
      next: (response: any) => {
        this.selectedUser = response.my_User;
      },
      error: (error: any) => { console.log(error); },
      complete: () => { }
    });
  }

  //GO BACK FUNCTION
  back() {
    this.router.navigate(['/users']);
  }

}
