import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccMainComponent } from './acc-main/acc-main.component';

const routes: Routes = [
  {path: '', component:AccMainComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
