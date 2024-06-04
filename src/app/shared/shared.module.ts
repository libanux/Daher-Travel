import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AddRowComponent } from './add-row/add-row.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { ButtonUsedComponent } from './button-used/button-used.component';
import { ChattingComponent } from './chatting/chatting.component';
import { CountBoxComponent } from './count-box/count-box.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginagtionComponent } from './paginagtion/paginagtion.component';
import { BaseTableComponent } from './base-table/base-table.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RoundChartComponent } from './round-chart/round-chart.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { TableShimmerComponent } from './table-shimmer/table-shimmer.component';


@NgModule({
  declarations: [
    AddRowComponent,
    BreadCrumbsComponent,
    ButtonUsedComponent,
    ChattingComponent,
    CountBoxComponent,
    DropdownComponent,
    HeaderComponent,
    LoadingComponent,
    NavbarComponent,
    PaginagtionComponent,
    BaseTableComponent,
    AreaChartComponent,
    BarChartComponent,
    RoundChartComponent,
    SearchBarComponent,
    SidebarComponent,
    SidebarButtonComponent,
    TableShimmerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
