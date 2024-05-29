import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ViewDocTranslationComponent } from './view-doc-translation/view-doc-translation.component';
import { DocumentMainComponent } from './document-main/document-main.component';
import { WebsiteTranslationComponent } from './website-translation/website-translation.component';
import { WebsiteMainComponent } from './website-main/website-main.component';
import { EditingProofreadingMaimComponent } from './editing-proofreading-maim/editing-proofreading-maim.component';
import { ViewWebTranslationComponent } from './view-web-translation/view-web-translation.component';
import { ViewEditProofreadingComponent } from './view-edit-proofreading/view-edit-proofreading.component';


const routes: Routes = [
  {path: 'documentMain', component:DocumentMainComponent},
  {path: 'WebsiteMain', component:WebsiteMainComponent},
  {path: 'documentTranslation', component:ViewDocTranslationComponent},
  {path: 'websiteTranslation', component:ViewWebTranslationComponent},
  {path: 'EditingAndProofreadingMain', component:EditingProofreadingMaimComponent},
  {path: 'documentTranslation', component:ViewDocTranslationComponent},
  {path: 'EditingAndProofreading', component:ViewEditProofreadingComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModuleModule]
})
export class TranslationRoutingModule { }
