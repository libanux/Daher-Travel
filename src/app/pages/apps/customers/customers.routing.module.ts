import { Routes } from '@angular/router';
import { CustomersComponent } from './main-page/customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

export const CustomersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: CustomersComponent,
      },
      {
        path: 'view',
        component: ViewCustomerComponent,
      },
    ],
  },
];
