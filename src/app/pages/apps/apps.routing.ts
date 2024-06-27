import { Routes } from '@angular/router';

import { AppNotesComponent } from './notes/notes.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppTicketlistComponent } from './packages/ticketlist.component';
import { VisaComponentComponent } from './visa-component/visa-component.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AdminsComponent } from './admins/admins.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { GeneralFinanceComponent } from './general-finance/general-finance.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'visa',
        component: VisaComponentComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      { path: 'wholesaler',
        loadChildren: () =>
          import('./wholesaler/wholesalers.module').then(
            (m) => m.WholesalersModule
          ),
      },
      { path: 'labor',
        loadChildren: () =>
          import('./labor-rec/labor-rec.module').then(
            (m) => m.LaborRecModule
          ),
      },
      {
        path: 'notes',
        component: AppNotesComponent,
      },
      {
        path: 'permission',
        component: AppPermissionComponent,
      },
      {
        path: 'package',
        component: AppTicketlistComponent,
      },

      { path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },

      {
        path: 'tickets',
        component:TicketsComponent
      },

      {
        path: 'profile',
        component:ProfileComponent
      },
      {
        path: 'general-finance',
        component:GeneralFinanceComponent
      },

    ],
  },
];
