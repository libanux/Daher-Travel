import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  //   RouterModule.forRoot([
  // {path:'admins', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)},
  // {path:'', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // {path:'caption', loadChildren: () => import('./caption/caption.module').then(m => m.CaptionModule)},
  // {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  // {path:'noti', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)},
  // {path:'proofreading', loadChildren: () => import('./proofreading/proofreading.module').then(m => m.ProofreadingModule)},
  // {path:'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  // {path:'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule)},
  // {path:'subtitles', loadChildren: () => import('./subtitles/subtitles.module').then(m => m.SubtitlesModule)},
  // {path:'transcription', loadChildren: () => import('./transcription/transcription.module').then(m => m.HomeModule)},
  // {path:'translation', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)},
  // {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)}
  //   ]),
      
    SharedModuleModule,
    // MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
