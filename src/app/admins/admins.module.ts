import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { FormsModule } from '@angular/forms';
import { AdminsTableComponent } from './admins-table/admins-table.component';


@NgModule({
  declarations: [
    MainComponent,
    AddAdminComponent,
    EditAdminComponent,
    DeleteAdminComponent,
    AdminsTableComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SharedModuleModule,
    FormsModule 
  ]
})
export class AdminsModule { }
