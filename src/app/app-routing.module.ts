import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  //a
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule) },


  // dashboard
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  // n
  { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },

  //p
  { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule) },

  //r
  { path: 'recruting', loadChildren: () => import('./recruiting/recruiting.module').then(m => m.RecruitingModule) },

  // s
  { path: 'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule) },

  // t
  { path: 'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'transcription', loadChildren: () => import('./transcription/transcription.module').then(m => m.HomeModule) },
  { path: 'translation', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule) },

  //v
  { path: 'visa', loadChildren: () => import('./visa/visa.module').then(m => m.VisaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
