import { Routes } from '@angular/router';

import { AppNotesComponent } from './notes/notes.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { AppTicketlistComponent } from './ticketlist/ticketlist.component';
import { AppContactComponent } from './contact/contact.component';
import { AppEmployeeComponent } from './employee/employee.component';
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { ViewticketComponent } from './ticketlist/viewticket/viewticket.component';
import { LaborRecModule } from './labor-rec/labor-rec.module';
import { VisaComponentComponent } from './visa-component/visa-component.component';
import { LaborMainComponent } from './labor-rec/labor-main/labor-main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AdminsComponent } from './admins/admins.component';
import { CustomersComponent } from './customers/customers.component';
import { ProfileComponent } from './profile/profile.component';
import { WholesalerComponent } from './wholesaler/wholesaler.component';


export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'visa',
        component: VisaComponentComponent,
      },
      {
        path: 'wholesaler',
        component: WholesalerComponent,
      },
      {
        path: 'labor',
        component: LaborRecModule,
      },
      {
        path: 'notes',
        component: AppNotesComponent,
      },
      { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },
      {
        path: 'permission',
        component: AppPermissionComponent,
      },
      {
        path: 'taskboard',
        component: AppTaskboardComponent,
      },
      {
        path: 'package',
        component: AppTicketlistComponent,
      },
      {
        path: 'contacts',
        component: AppContactComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'invoice',
        component: AppInvoiceListComponent,
      },
      {
        path: 'addInvoice',
        component: AppAddInvoiceComponent,
      },
      {
        path: 'viewInvoice/:id',
        component: AppInvoiceViewComponent,
      },
      {
        path: 'editinvoice/:id',
        component: AppEditInvoiceComponent,
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
