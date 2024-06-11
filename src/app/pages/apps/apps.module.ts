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

//Contact
import { AppContactDialogContentComponent } from './contact/contact.component';
import { AppContactComponent } from './contact/contact.component';

//Notes
import { AppNotesComponent } from './notes/notes.component';

// Permission
import { AppPermissionComponent } from './permission/permission.component';

//Taskboard
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { TaskDialogComponent } from './taskboard/task-dialog.component';
import { OkAppTaskComponent } from './taskboard/ok-task/ok-task.component';
import { DeleteAppTaskComponent } from './taskboard/delete-task/delete-task.component';

//Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppEmployeeComponent } from './employee/employee.component';
import { AppEmployeeDialogContentComponent } from './employee/employee.component';
import { AppAddEmployeeComponent } from './employee/add/add.component';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { AppTicketlistComponent, AppTicketDialogContentComponent } from './ticketlist/ticketlist.component';

//Invoice
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { OkDialogComponent } from './invoice/edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './invoice/add-invoice/added-dialog/added-dialog.component';

// labor
import { AppRecruitingDialogContentComponent, LaborMainComponent } from './labor-rec/labor-main/labor-main.component';


// visa
import { VisaComponentComponent } from './visa-component/visa-component.component';
import { ViewticketComponent } from './ticketlist/viewticket/viewticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AdminDialogContentComponent, AdminsComponent } from './admins/admins.component';
import { AddComponent } from './admins/add-admin/add.component';
import { ProfileComponent } from './profile/profile.component';

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
    NgScrollbarModule
    
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppPermissionComponent,
    AppNotesComponent,
    AppTaskboardComponent,
    TaskDialogComponent,
    OkAppTaskComponent,
    DeleteAppTaskComponent,
    AppTicketlistComponent,
    AppTicketDialogContentComponent,
    AppContactComponent,
    AppContactDialogContentComponent,
    AppEmployeeComponent,
    AppEmployeeDialogContentComponent,
    AppAddEmployeeComponent,
    AppInvoiceListComponent,
    AppInvoiceViewComponent,
    AppAddInvoiceComponent,
    AppEditInvoiceComponent,
    AddedDialogComponent,
    OkDialogComponent,
    VisaComponentComponent,
    LaborMainComponent,
    AppTicketlistComponent,
    ViewticketComponent,
    TicketsComponent,
    AdminsComponent,
    AdminDialogContentComponent,
    AddComponent,
    LaborMainComponent,
    AppRecruitingDialogContentComponent,
    ProfileComponent
    
  ],
  providers: [DatePipe],
})
export class AppsModule {}
