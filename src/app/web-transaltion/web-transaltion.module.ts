import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebTransaltionRoutingModule } from './web-transaltion-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewTranslationComponent } from './view-translation/view-translation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    ViewTranslationComponent
  ],
  imports: [
    CommonModule,
    WebTransaltionRoutingModule,
    SharedModuleModule,
    FormsModule 
  ]
})
export class WebTransaltionModule { }
