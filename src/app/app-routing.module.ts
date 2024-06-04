import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path:'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)},
  {path:'audioVisual', loadChildren: () => import('./audio-visual/audio-visual.module').then(m => m.AudioVisualModule)},

  {path:'',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // dashboard
  {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // n
  {path:'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)},

  // s
  {path:'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule)},

  // t
  {path:'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)},
  {path:'transcription', loadChildren: () => import('./transcription/transcription.module').then(m => m.HomeModule)},
  {path:'translation', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   