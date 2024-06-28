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
import { AuthGuard } from 'src/app/Auth-Guard/auth.guard';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'visa',
        component: VisaComponentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      },
      { path: 'wholesaler',
        loadChildren: () =>
          import('./wholesaler/wholesalers.module').then(
            (m) => m.WholesalersModule
          ),
          canActivate: [AuthGuard]
      },
      { path: 'labor',
        loadChildren: () =>
          import('./labor-rec/labor-rec.module').then(
            (m) => m.LaborRecModule
          ),
          canActivate: [AuthGuard]
      },
      {
        path: 'notes',
        component: AppNotesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'permission',
        component: AppPermissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'package',
        component: AppTicketlistComponent,
        canActivate: [AuthGuard]
      },

      { path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then(
            (m) => m.CustomersModule
          ),
          canActivate: [AuthGuard]
      },
      {
        path: 'admins',
        component: AdminsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'tickets',
        component:TicketsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'profile',
        component:ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'general-finance',
        component:GeneralFinanceComponent,
        canActivate: [AuthGuard]
      },

    ],
  },
];
