import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentServicesMainComponent } from './content-services-main/content-services-main.component';

const routes: Routes = [
  {path:'',component:ContentServicesMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentServicesRoutingModule { }
