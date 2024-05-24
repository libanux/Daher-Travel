import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentServicesRoutingModule } from './content-services-routing.module';
import { ContentServicesMainComponent } from './content-services-main/content-services-main.component';
import { ContentServicesTableComponent } from './content-services-table/content-services-table.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    ContentServicesMainComponent,
    ContentServicesTableComponent
  ],
  imports: [
    CommonModule,
    ContentServicesRoutingModule,
    SharedModuleModule
  ]
})
export class ContentServicesModule { }
