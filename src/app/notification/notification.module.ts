import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotiMainComponent } from './noti-main/noti-main.component';
import { NotiFormComponent } from './noti-form/noti-form.component';


@NgModule({
  declarations: [
    NotiMainComponent,
    NotiFormComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
