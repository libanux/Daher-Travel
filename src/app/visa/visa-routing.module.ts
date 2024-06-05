import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisaMainComponent } from './visa-main/visa-main.component';

const routes: Routes = [
  {path:'', component: VisaMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisaRoutingModule { }
