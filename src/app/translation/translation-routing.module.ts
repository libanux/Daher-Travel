import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModuleModule]
})
export class TranslationRoutingModule { }
