import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Notes
import { AppNotesComponent } from './notes/notes.component';

// Permission
import { AppPermissionComponent } from './permission/permission.component';

//Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { AppTicketlistComponent, AppPackageDialogContentComponent } from './packages/ticketlist.component';

// labor
import { AppRecruitingDialogContentComponent, LaborMainComponent } from './labor-rec/labor-main/labor-main.component';

// visa
import { VisaComponentComponent, visaDialogContentComponent } from './visa-component/visa-component.component';
import { AppTicketingDialogContentComponent, TicketsComponent } from './tickets/tickets.component';
import { AdminDialogContentComponent, AdminsComponent } from './admins/admins.component';
import { AddComponent } from './admins/add-admin/add.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerDialogContentComponent, CustomersComponent } from './customers/main-page/customers.component';
import { DeleteWholesalerDialogContentComponent, WholesalerComponent } from './wholesaler/wholesaler.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewWholesalerComponent } from './wholesaler/view-wholesaler/view-wholesaler.component';
import { LaborReportsComponent } from './labor-rec/labor-reports/labor-reports.component';
import { NoItemsFoundComponent } from './no-items-found/no-items-found.component';
import { TableShimmerComponent } from './table-shimmer/table-shimmer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,

    
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppPermissionComponent,
    AppNotesComponent,
    AppTicketlistComponent,
    VisaComponentComponent,
    LaborMainComponent,
    AppTicketlistComponent,
    TicketsComponent,
    AdminsComponent,
    AdminDialogContentComponent,
    AddComponent,
    LaborMainComponent,
    AppRecruitingDialogContentComponent,
    ProfileComponent,
    AppPackageDialogContentComponent,
    AppTicketingDialogContentComponent,
    CustomersComponent,
    WholesalerComponent,
    ViewCustomerComponent,
    CustomerDialogContentComponent,
    ReportsComponent,
    DeleteWholesalerDialogContentComponent,
    ViewWholesalerComponent,
    visaDialogContentComponent,
    LaborReportsComponent,
    NoItemsFoundComponent,
    TableShimmerComponent,
    WholesalerComponent,
    TicketsComponent,

  ],
  providers: [DatePipe],
})
export class AppsModule {}
