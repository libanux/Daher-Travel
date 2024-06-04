import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  // dashboard
  {path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  // n
  {path:'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule)},

  // s
  {path:'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
