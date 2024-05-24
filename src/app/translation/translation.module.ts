import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationRoutingModule } from './translation-routing.module';
import { DetailsFormComponent } from './details-form/details-form.component';
import { FileFormComponent } from './file-form/file-form.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DocumentTranslationComponent } from './document-translation/document-translation.component';
import { WebsiteTranslationComponent } from './website-translation/website-translation.component';
import { ViewDocTranslationComponent } from './view-doc-translation/view-doc-translation.component';
import { DocumentMainComponent } from './document-main/document-main.component';
import { WebsiteMainComponent } from './website-main/website-main.component';
import { EditingProofreadingMaimComponent } from './editing-proofreading-maim/editing-proofreading-maim.component';
import { ViewEditProofreadingComponent } from './view-edit-proofreading/view-edit-proofreading.component';
import { WebsiteTransTableComponent } from './website-trans-table/website-trans-table.component';
import { DocumentTransTableComponent } from './document-trans-table/document-trans-table.component';
import { ViewWebTranslationComponent } from './view-web-translation/view-web-translation.component';
import { WebTransUrlformComponent } from './web-trans-urlform/web-trans-urlform.component';
import { EditProofreadingTableComponent } from './edit-proofreading-table/edit-proofreading-table.component';




@NgModule({
  declarations: [
    DetailsFormComponent,
    FileFormComponent,
    UsersFormComponent,
    PaymentFormComponent,
    DocumentTranslationComponent,
    WebsiteTranslationComponent,
    ViewDocTranslationComponent,
    DocumentMainComponent,
    WebsiteMainComponent,
    EditingProofreadingMaimComponent,
    ViewEditProofreadingComponent,
    WebsiteTransTableComponent,
    DocumentTransTableComponent,
    ViewWebTranslationComponent,
    WebTransUrlformComponent,
    EditProofreadingTableComponent,


    ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TranslationModule { }
