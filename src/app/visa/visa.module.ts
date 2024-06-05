import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisaRoutingModule } from './visa-routing.module';
import { VisaMainComponent } from './visa-main/visa-main.component';
import { VisaTableComponent } from './visa-table/visa-table.component';


@NgModule({
  declarations: [
    VisaMainComponent,
    VisaTableComponent
  ],
  imports: [
    CommonModule,
    VisaRoutingModule
  ]
})
export class VisaModule { }
