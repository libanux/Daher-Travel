import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // a
  {path:'admins', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)},
  {path:'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)},
  {path:'audioVisual', loadChildren: () => import('./audio-visual/audio-visual.module').then(m => m.AudioVisualModule)},
  {path:'', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // c
  {path:'caption', loadChildren: () => import('./caption/caption.module').then(m => m.CaptionModule)},
  {path:'contentServices', loadChildren: () => import('./content-services/content-services.module').then(m => m.ContentServicesModule)},

  // d
  {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // n
  {path:'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)},

  // p
  {path:'proofreading', loadChildren: () => import('./proofreading/proofreading.module').then(m => m.ProofreadingModule)},

  // s
  {path:'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path:'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule)},

  // t
  {path:'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)},
  {path:'transcription', loadChildren: () => import('./transcription/transcription.module').then(m => m.HomeModule)},
  {path:'translation', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)},

  // u
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   