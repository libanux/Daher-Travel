import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaborMainComponent } from './labor-main/labor-main.component';
import { LaborReportsComponent } from './labor-reports/labor-reports.component';

export const laborRoutes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: LaborMainComponent,
    },
    {
      path: 'reports',
      component: LaborReportsComponent,
    }
  ],
},
];