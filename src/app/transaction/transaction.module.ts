import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModuleModule
  ]
})
export class TransactionModule { }
