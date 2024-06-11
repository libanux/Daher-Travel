import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { laborRoutes } from './labor-rec-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    RouterModule.forChild(laborRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class LaborRecModule { }
