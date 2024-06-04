import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackageMainComponent } from './package-main/package-main.component';
import { PackageTableComponent } from './package-table/package-table.component';


@NgModule({
  declarations: [
    PackageMainComponent,
    PackageTableComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule
  ]
})
export class PackageModule { }
