import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MainComponent } from './main/main.component';
import { ViewTranslationComponent } from './view-translation/view-translation.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'details', component:ViewTranslationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModuleModule]
})
export class TranslationRoutingModule { }
