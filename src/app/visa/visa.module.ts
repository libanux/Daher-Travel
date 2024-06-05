import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisaRoutingModule } from './visa-routing.module';
import { VisaTableComponent } from './visa-table/visa-table.component';
import { VisaMainComponent } from './visa-main/visa-main.component';


@NgModule({
  declarations: [
    VisaTableComponent,
    VisaMainComponent
  ],
  imports: [
    CommonModule,
    VisaRoutingModule
  ]
})
export class VisaModule { }
