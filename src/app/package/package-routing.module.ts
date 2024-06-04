import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageMainComponent } from './package-main/package-main.component';

const routes: Routes = [
  {path:'', component:PackageMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
