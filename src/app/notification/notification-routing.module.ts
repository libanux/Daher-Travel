import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotiMainComponent } from './noti-main/noti-main.component';

const routes: Routes = [
  {path: '', component:NotiMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
