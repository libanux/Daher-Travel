import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { MainComponent } from './main/main.component';
import { NotiFormComponent } from './noti-form/noti-form.component';


@NgModule({
  declarations: [
    MainComponent,
    NotiFormComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
