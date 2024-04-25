import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptionRoutingModule } from './caption-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CaptionRoutingModule,
    SharedModuleModule
  ]
})
export class CaptionModule { }
