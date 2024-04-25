import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationRoutingModule } from './translation-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TranslationRoutingModule
  ]
})
export class TranslationModule { }
