import { Routes } from '@angular/router';

import { AppNotesComponent } from './notes/notes.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppTicketlistComponent } from './ticketlist/ticketlist.component';
import { ViewticketComponent } from './ticketlist/viewticket/viewticket.component';
import { LaborRecModule } from './labor-rec/labor-rec.module';
import { VisaComponentComponent } from './visa-component/visa-component.component';
import { LaborMainComponent } from './labor-rec/labor-main/labor-main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AdminsComponent } from './admins/admins.component';
import { CustomersComponent } from './customers/main-page/customers.component';
import { ProfileComponent } from './profile/profile.component';
import { WholesalerComponent } from './wholesaler/wholesaler.component';
import { ReportsComponent } from './reports/reports.component';


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
      {
        path: 'labor',
        component: LaborRecModule,
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
        path: 'viewPackage/:id',
        component:ViewticketComponent
      },
 

      {
        path: 'labors',
        component:LaborMainComponent
      },

      {
        path: 'tickets',
        component:TicketsComponent
      },

      {
        path: 'profile',
        component:ProfileComponent
      },

    ],
  },
];
