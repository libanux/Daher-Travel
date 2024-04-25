import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './transcription-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsFormComponent } from './details-form/details-form.component';
import { FileFormComponent } from './file-form/file-form.component';
import { ViewTranscriptionComponent } from './view-transcription/view-transcription.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


@NgModule({
  declarations: [
    HomepageComponent,
    DetailsFormComponent,
    FileFormComponent,
    ViewTranscriptionComponent,
    UsersFormComponent,
    PaymentFormComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
