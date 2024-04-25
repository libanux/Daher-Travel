import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewTranscriptionComponent } from './view-transcription/view-transcription.component';

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'details', component:ViewTranscriptionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
