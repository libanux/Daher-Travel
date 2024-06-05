import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaborRecuitmentRoutingModule } from './labor-recuitment-routing.module';
import { RecMainComponent } from './rec-main/rec-main.component';
import { RecTableComponent } from './rec-table/rec-table.component';


@NgModule({
  declarations: [
    RecMainComponent,
    RecTableComponent
  ],
  imports: [
    CommonModule,
    LaborRecuitmentRoutingModule
  ]
})
export class LaborRecuitmentModule { }
