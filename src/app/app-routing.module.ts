import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [

      {
        path: 'labor',
        loadChildren: () => import('./pages/apps/labor-rec/labor-rec.module').then((m) => m.LaborRecModule),
      },
      {
        path: 'apps',
        loadChildren: () => import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },

  {
    path: '', component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**', redirectTo: '/'
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
