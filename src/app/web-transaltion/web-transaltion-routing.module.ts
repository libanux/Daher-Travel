import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewTranslationComponent } from './view-translation/view-translation.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'view', component:ViewTranslationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebTransaltionRoutingModule { }
