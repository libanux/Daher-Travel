import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebTransaltionRoutingModule } from './web-transaltion-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    WebTransaltionRoutingModule,
    SharedModuleModule
  ]
})
export class WebTransaltionModule { }
