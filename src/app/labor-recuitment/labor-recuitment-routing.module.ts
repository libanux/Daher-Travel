import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecMainComponent } from './rec-main/rec-main.component';

const routes: Routes = [
  {path: '', component:RecMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborRecuitmentRoutingModule { }
