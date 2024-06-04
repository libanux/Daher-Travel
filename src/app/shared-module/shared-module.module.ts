import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { ButtonUsedComponent } from './button-used/button-used.component';
import { TableShimmerComponent } from './table-shimmer/table-shimmer.component';
import { ButtonAddPhoneSizeComponent } from './button-add-phone-size/button-add-phone-size.component';
import { LoadingComponent } from './loading/loading.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { CountBoxComponent } from './count-box/count-box.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChattingComponent } from './chatting/chatting.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RoundChartComponent } from './round-chart/round-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseTableComponent } from './base-table/base-table.component';


@NgModule({
declarations: [
  SidebarComponent,
  HeaderComponent,
  SearchBarComponent,
  PaginationComponent,
  NavbarComponent,
  BreadCrumbsComponent,
  SidebarButtonComponent,
  ButtonUsedComponent,
  TableShimmerComponent,
  ButtonAddPhoneSizeComponent,
  LoadingComponent,
  DropdownComponent,
  DropdownFilterComponent,
  CountBoxComponent,
  ProgressBarComponent,
  NotFoundComponent,
  ChattingComponent,
  ChartComponent,
  BarChartComponent,
  RoundChartComponent,
  LineChartComponent,
  AreaChartComponent,
  BaseTableComponent,

],

imports: [CommonModule, FormsModule, ReactiveFormsModule, ChartModule,AgChartsAngularModule,HttpClientModule],

exports: [
  HeaderComponent,
  SearchBarComponent,
  SidebarComponent,
  NavbarComponent,
  ButtonUsedComponent,
  TableShimmerComponent,
  LoadingComponent,
  DropdownComponent,
  DropdownFilterComponent,
  CountBoxComponent,
  ProgressBarComponent,
  NotFoundComponent,
  PaginationComponent,
  ChattingComponent,
  ChartComponent,
  BarChartComponent,
  RoundChartComponent,
  LineChartComponent,
  AreaChartComponent,
  BaseTableComponent
],

providers: [],
})
export class SharedModuleModule { }
