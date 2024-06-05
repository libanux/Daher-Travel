import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingTableComponent } from './accounting-table/accounting-table.component';
import { AccountingMainComponent } from './accounting-main/accounting-main.component';


@NgModule({
  declarations: [
    AccountingTableComponent,
    AccountingMainComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
