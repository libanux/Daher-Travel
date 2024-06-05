import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingMainComponent } from './accounting-main/accounting-main.component';

const routes: Routes = [
  {path:'', component: AccountingMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
