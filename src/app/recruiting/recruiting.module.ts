import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitingRoutingModule } from './recruiting-routing.module';
import { RecTableComponent } from './rec-table/rec-table.component';
import { RecMainComponent } from './rec-main/rec-main.component';


@NgModule({
  declarations: [
    RecTableComponent,
    RecMainComponent
  ],
  imports: [
    CommonModule,
    RecruitingRoutingModule
  ]
})
export class RecruitingModule { }
