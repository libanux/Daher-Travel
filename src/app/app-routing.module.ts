import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // a
  {path:'admins',canActivate: [AuthGuard] , loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)},
  {path:'analytics',canActivate: [AuthGuard], loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)},
  {path:'audioVisual',canActivate: [AuthGuard], loadChildren: () => import('./audio-visual/audio-visual.module').then(m => m.AudioVisualModule)},
  {path:'',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // c
  {path:'caption',canActivate: [AuthGuard], loadChildren: () => import('./caption/caption.module').then(m => m.CaptionModule)},
  {path:'contentServices',canActivate: [AuthGuard], loadChildren: () => import('./content-services/content-services.module').then(m => m.ContentServicesModule)},

  // d
  {path:'dashboard',canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // n
  {path:'notification',canActivate: [AuthGuard], loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)},

  // p
  {path:'proofreading',canActivate: [AuthGuard], loadChildren: () => import('./proofreading/proofreading.module').then(m => m.ProofreadingModule)},

  // s
  {path:'services',canActivate: [AuthGuard], loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path:'shared',canActivate: [AuthGuard], loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule)},

  // t
  {path:'transaction',canActivate: [AuthGuard], loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)},
  {path:'transcription',canActivate: [AuthGuard], loadChildren: () => import('./transcription/transcription.module').then(m => m.HomeModule)},
  {path:'translation',canActivate: [AuthGuard], loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)},

  // u
  {path:'users',canActivate: [AuthGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   