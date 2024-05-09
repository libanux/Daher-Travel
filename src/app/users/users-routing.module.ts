import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewUserComponent } from './view-user/view-user.component';


const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'view', component:ViewUserComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModuleModule]
})
export class UsersRoutingModule { }
