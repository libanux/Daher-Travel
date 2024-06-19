import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WholesalersRoutes } from './wholesalers.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(WholesalersRoutes)
  ],
})
export class WholesalersModule {}
