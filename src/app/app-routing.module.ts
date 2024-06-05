import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // dashboard
  {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // s
  {path:'shared', loadChildren: () => import('./shared-module/shared-module.module').then(m => m.SharedModuleModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   