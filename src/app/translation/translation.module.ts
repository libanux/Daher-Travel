import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationRoutingModule } from './translation-routing.module';
import { MainComponent } from './main/main.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { FileFormComponent } from './file-form/file-form.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewTranslationComponent } from './view-translation/view-translation.component';


@NgModule({
  declarations: [
    MainComponent,
    DetailsFormComponent,
    FileFormComponent,
    UsersFormComponent,
    PaymentFormComponent,
    ViewTranslationComponent
    ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class TranslationModule { }
