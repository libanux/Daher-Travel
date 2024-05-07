import { Component, OnInit, effect } from '@angular/core';
import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{
  selectedUser !: User 
  userId: number =0;
  constructor(private userService: UserService,private route: ActivatedRoute) {
    effect(() => {
      this.userService.getUserByID(this.userId);
      console.log(`The current user is: `,this.selectedUser);
    });
   }
   
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Access the id query parameter
      this.userId = params['id']; 
      this.userService.getUserByID(this.userId);
    this.selectedUser = this.userService.selectedUser(); 
    console.log("selected user",this.selectedUser)
    });
   
  }
  }