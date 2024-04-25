import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofreadingRoutingModule } from './proofreading-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ProofreadingRoutingModule,
    SharedModuleModule
  ]
})
export class ProofreadingModule { }
