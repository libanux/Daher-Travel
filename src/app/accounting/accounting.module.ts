import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccMainComponent } from './acc-main/acc-main.component';
import { AccTableComponent } from './acc-table/acc-table.component';


@NgModule({
  declarations: [
    AccMainComponent,
    AccTableComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
