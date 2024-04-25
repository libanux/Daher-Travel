import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { MainComponent } from './main/main.component';
import { LegalComponent } from './legal/legal.component';
import { MedicalComponent } from './medical/medical.component';
import { TechnicalComponent } from './technical/technical.component';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [
    MainComponent,
    LegalComponent,
    MedicalComponent,
    TechnicalComponent,
    MediaComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
