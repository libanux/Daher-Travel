import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'view', component:ViewUserComponent},
  {path: 'add', component:AddUserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModuleModule]
})
export class UsersRoutingModule { }
