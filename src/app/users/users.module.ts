import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MainComponent } from './main/main.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    ViewUserComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule 
  ]
})
export class UsersModule { }
