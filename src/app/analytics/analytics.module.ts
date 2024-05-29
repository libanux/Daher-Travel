import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsMainComponent } from './analytics-main/analytics-main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    AnalyticsMainComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModuleModule
  ]
})
export class AnalyticsModule { }
