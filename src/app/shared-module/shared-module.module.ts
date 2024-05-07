import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { LogoComponent } from './logo/logo.component';
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
import { TopicsComponent } from './topics/topics.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TranscriptionTableComponent } from './transcription-table/transcription-table.component';
import { CaptionTableComponent } from './caption-table/caption-table.component';
import { TranslationTableComponent } from './translation-table/translation-table.component';
import { SubtitlesTableComponent } from './subtitles-table/subtitles-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ProofreadingTableComponent } from './proofreading-table/proofreading-table.component';
import { AdminsTableComponent } from './admins-table/admins-table.component';
import { MainTransactionComponent } from './main-transaction/main-transaction.component';


@NgModule({
declarations: [
  SidebarComponent,
  HeaderComponent,
  SearchBarComponent,
  LogoComponent,
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
  TopicsComponent,
  ProgressBarComponent,
  TranscriptionTableComponent,
  CaptionTableComponent,
  TranslationTableComponent,
  SubtitlesTableComponent,
  NotFoundComponent,
  TransactionTableComponent,
  UsersTableComponent,
  ProofreadingTableComponent,
  AdminsTableComponent,
  MainTransactionComponent 
],

imports: [CommonModule, FormsModule, ReactiveFormsModule],

exports: [
  HeaderComponent,
  SearchBarComponent,
  SidebarComponent,
  LogoComponent,
  NavbarComponent,
  ButtonUsedComponent,
  TableShimmerComponent,
  LoadingComponent,
  DropdownComponent,
  DropdownFilterComponent,
  CountBoxComponent,
  TopicsComponent,
  ProgressBarComponent,
  MainTransactionComponent,
  CaptionTableComponent,
  TranslationTableComponent,
  SubtitlesTableComponent,
  NotFoundComponent,
  TranscriptionTableComponent,
  UsersTableComponent,
  ProofreadingTableComponent,
  AdminsTableComponent
],

providers: [],
})
export class SharedModuleModule { }
