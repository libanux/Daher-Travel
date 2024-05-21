import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioVisualRoutingModule } from './audio-visual-routing.module';
import { TranslationMainComponent } from './translation-main/translation-main.component';
import { TranscriptionMainComponent } from './transcription-main/transcription-main.component';
import { SubtitlingMainComponent } from './subtitling-main/subtitling-main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    TranslationMainComponent,
    TranscriptionMainComponent,
    SubtitlingMainComponent
  ],
  imports: [
    CommonModule,
    AudioVisualRoutingModule,
    SharedModuleModule
  ]
})
export class AudioVisualModule { }
