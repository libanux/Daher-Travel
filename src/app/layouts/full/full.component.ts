import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreService } from 'src/app/services/core.service';
import { AppSettings } from 'src/app/app.config';
import { navItems } from './vertical/sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppSearchDialogComponent, HeaderComponent } from './vertical/header/header.component';
import { SidebarComponent } from './vertical/sidebar/sidebar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppNavItemComponent, NavbarItemDialogContentComponent } from './vertical/sidebar/nav-item/nav-item.component';
import { AdminService } from 'src/app/services/Admins.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  standalone: true,
  imports: [
    NgScrollbarModule,
    HeaderComponent,
    SidebarComponent,
    AppSearchDialogComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
    AppNavItemComponent
  ],
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit {
  navItems = navItems;
  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  //get options from service
  options = this.settings.getOptions();
  navopt = this.navService.showClass;
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  constructor(
    private adminsService:AdminService,
    private settings: CoreService,
    private mediaMatcher: MediaMatcher,
    private navService: NavService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[BELOWMONITOR];

        // if (this.options.sidenavCollapsed == false) {
        //   this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        // }
        // this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        // this.resView = state.breakpoints[BELOWMONITOR];
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  admins_permissions: any = {
        packages: '',
        visa: '',
        recruitment: '',
        accounting: '',
        users: '',
        notes: '',
        allreports: '',
        customers: '',
        laborReports: '',
        ticketing: '',
        wholesalers: ''
    };
    adminID: string;
    filteredNavItems: any[] = []
    
  ngOnInit(): void {
    this.adminID = localStorage.getItem('admin_id') || '';
      // GET ADMIN LOGGED IN BY ID STORED IN LOCAL STORAGE
    this.adminsService.GET_ADMIN_BY_ID(this.adminID).subscribe({
      next: (response: any) => {
         this.admins_permissions = response.permissions; 
         console.log(response);

      // Filter navItems based on admins_permissions
      this.filteredNavItems = this.navItems.filter(item => {
        // Check if item has permission_name and user has that permission
        return !item.permission_name || this.admins_permissions[item.permission_name] !== 'none';
      }); 
        },
      error: (error: any) => { },
      complete: () => {
      console.log(this.filteredNavItems)
      }
    });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}
