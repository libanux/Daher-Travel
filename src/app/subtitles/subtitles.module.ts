import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtitlesRoutingModule } from './subtitles-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SubtitlesRoutingModule,
    SharedModuleModule
  ]
})
export class SubtitlesModule { }
