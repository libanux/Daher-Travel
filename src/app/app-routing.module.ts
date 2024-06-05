import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  //auth
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
   // accounting
  { path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule) },

  // dashboard
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  //package
  { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule) },

  // labor rec
  { path: 'recruting', loadChildren: () => import('./recruiting/recruiting.module').then(m => m.RecruitingModule) },

  //shared
  { path: 'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule) },

  //visa
  { path: 'visa', loadChildren: () => import('./visa/visa.module').then(m => m.VisaModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
