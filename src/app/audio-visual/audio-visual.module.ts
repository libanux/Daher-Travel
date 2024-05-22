import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioVisualRoutingModule } from './audio-visual-routing.module';
import { TranslationMainComponent } from './translation-main/translation-main.component';
import { TranscriptionMainComponent } from './transcription-main/transcription-main.component';
import { SubtitlingMainComponent } from './subtitling-main/subtitling-main.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { TranscriptionTableComponent } from './transcription-table/transcription-table.component';
import { TranslationTableComponent } from './translation-table/translation-table.component';
import { SubtitlingTableComponent } from './subtitling-table/subtitling-table.component';


@NgModule({
  declarations: [
    TranslationMainComponent,
    TranscriptionMainComponent,
    SubtitlingMainComponent,
    TranscriptionTableComponent,
    TranslationTableComponent,
    SubtitlingTableComponent
  ],
  imports: [
    CommonModule,
    AudioVisualRoutingModule,
    SharedModuleModule
  ]
})
export class AudioVisualModule { }
