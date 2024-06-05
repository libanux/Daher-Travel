import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  // accounting
  {path:'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)},

  //auth
  {path:'',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // dashboard
  {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // recruitment
  {path:'recruitment', loadChildren: () => import('./labor-recuitment/labor-recuitment.module').then(m => m.LaborRecuitmentModule)},

  // package
  {path:'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule)},

  // shared
  {path:'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},

  // package
  {path:'visa', loadChildren: () => import('./visa/visa.module').then(m => m.VisaModule)},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
