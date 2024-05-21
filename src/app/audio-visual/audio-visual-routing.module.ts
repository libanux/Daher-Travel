import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtitlingMainComponent } from './subtitling-main/subtitling-main.component';
import { TranscriptionMainComponent } from './transcription-main/transcription-main.component';
import { TranslationMainComponent } from './translation-main/translation-main.component';

const routes: Routes = [
  {path: 'SubtitlingMain', component:SubtitlingMainComponent},
  {path: 'TranscriptionMain', component:TranscriptionMainComponent},
  {path: 'TranslationMain', component:TranslationMainComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioVisualRoutingModule { }
