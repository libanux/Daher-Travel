import { Routes } from '@angular/router';
import { WholesalerComponent } from './wholesaler.component';
import { ViewWholesalerComponent } from './view-wholesaler/view-wholesaler.component';


export const WholesalersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: WholesalerComponent,
      },
      {
        path: 'view',
        component: ViewWholesalerComponent,
      },
    ],
  },
];
