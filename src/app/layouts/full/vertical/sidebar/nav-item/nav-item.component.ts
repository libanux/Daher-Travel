import { Component, HostBinding, Input, OnInit, OnChanges, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { NavItem } from '../../../../../classes/nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../../services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../../../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { Admin } from 'src/app/classes/admin.class';
import { AdminService } from 'src/app/services/Admins.service';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [TranslateModule, TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav.component.scss',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class AppNavItemComponent implements OnChanges, OnInit {
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  expanded: any = false;
  disabled: any = false;
  twoLines: any = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem | any;
  @Input() depth: any;



  showToggle = true;
  svgContent: string = ''

  constructor(private adminService: AdminService, private routeSignalService: RouteSignalService, private dialog: MatDialog, public navService: NavService, public router: Router, private authService: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }


  ngOnInit(): void {
    // console.log('items : ', this.item.permission_name)
    if (this.item.iconName) {
      // Extract only the main SVG content from this.item.iconName
      this.svgContent = this.extractSvgContent(this.item.iconName);
      this.registerSvgIcon('custom-icon', this.svgContent);
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (item.displayName == 'logout') {
      this.authService.LOGOUT();
      this.router.navigate(['/login']).then(() => {
        window.scrollTo(0, 0);
      });
    }

    else {
      if (!item.children || !item.children.length) {
        this.router.navigate([item.route]);
        this.routeSignalService.show_pop_up_route.set(false);
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
      //scroll
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      if (!this.expanded) {
        if (window.innerWidth < 1024) {
          this.notify.emit();
        }
      }
    }

  }

  // POP UP SHOW --> ONLY IF THE ADMIN HAS WRITTEN DATA 
  // TO KEEP THE DATA THAT THE ADMIN HAS WRITTEN AND NOT LOOSE DATA
  // A POP UP SHOWN : ARE U SURE U WANT TO GO TO (THIS SELECTED ROUTE)
  OPEN_DIALOG(obj: any): void {

    if (this.routeSignalService.show_pop_up_route() == true) {
      const dialogRef = this.dialog.open(NavbarItemDialogContentComponent, {
        data: obj,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.event != 'Cancel') {
          this.onItemSelected(obj);
        }
        else {
          dialogRef.close({ event: 'Cancel' });
        }
      });
    }

    else {
      this.onItemSelected(obj);
    }

  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (this.expanded && window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }

  isRouteActive(item: any): boolean {
    const currentUrl = this.router.url;
    if (item.route) {
      if (currentUrl.includes('customers')) {
        return item.route.includes('customers');
      } else if (currentUrl.includes('wholesaler')) {
        return item.route.includes('wholesaler');
      }
      return this.router.isActive(item.route, true);
    }
    return false;
  }
  private extractSvgContent(iconName: string): string {
    // Example logic to extract SVG content from iconName
    // Modify according to your SVG structure and how you want to extract it
    const startIndex = iconName.indexOf('<svg');
    const endIndex = iconName.indexOf('</svg>') + '</svg>'.length;

    return iconName.substring(startIndex, endIndex);
  }

  getSafeHtml(svg: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(svg);
  }

  private registerSvgIcon(iconName: string, svgContent: string): void {
    // Register the SVG icon using MatIconRegistry
    this.matIconRegistry.addSvgIconLiteral(iconName, this.domSanitizer.bypassSecurityTrustHtml(svgContent));
  }

}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './navbar-items-dialog.html',
  styleUrl: './navbar-items-dialog.scss',
})
// tslint:disable-next-line: component-class-suffix
export class NavbarItemDialogContentComponent {

  Selected_Route: any;

  constructor(
    public dialogRef: MatDialogRef<NavbarItemDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: NavItem,
  ) {
    this.Selected_Route = { ...data };
  }

  doAction(): void {
    this.dialogRef.close({ data: this.Selected_Route });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
