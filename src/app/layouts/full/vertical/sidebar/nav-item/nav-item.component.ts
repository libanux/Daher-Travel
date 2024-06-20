import { Component, HostBinding, Input, OnInit, OnChanges, Output,  EventEmitter } from '@angular/core';
import { NavItem } from '../../../../../classes/nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../../services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../../../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

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
export class AppNavItemComponent implements OnChanges,OnInit{
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  expanded: any = false;
  disabled: any = false;
  twoLines: any = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem | any;
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router, private authService : AuthService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    if (this.depth === undefined) {
      this.depth = 0;
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

    if(item.displayName == 'logout'){
        this.authService.LOGOUT();
        this.router.navigate(['/login']).then(() => {
          window.scrollTo(0, 0);
        });
    }

    else {
      if (!item.children || !item.children.length) {
        this.router.navigate([item.route]); 
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
      //scroll
      window.scroll({  top: 0,  left: 0,  behavior: 'smooth' });
      if (!this.expanded){
      if (window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
    }

  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length){
      if (this.expanded && window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }

  showToggle = true;


svgContent: string =''
ngOnInit(): void {
  if (this.item.iconName) {
    // Extract only the main SVG content from this.item.iconName
    this.svgContent = this.extractSvgContent(this.item.iconName);
    this.registerSvgIcon('custom-icon', this.svgContent);
    
  }
}

private extractSvgContent(iconName: string): string {
  // Example logic to extract SVG content from iconName
  // Modify according to your SVG structure and how you want to extract it
  const startIndex = iconName.indexOf('<svg');
  const endIndex = iconName.indexOf('</svg>') + '</svg>'.length;
  
  return iconName.substring(startIndex, endIndex);
}


private registerSvgIcon(iconName: string, svgContent: string): void {
  // Register the SVG icon using MatIconRegistry
  this.matIconRegistry.addSvgIconLiteral(iconName, this.domSanitizer.bypassSecurityTrustHtml(svgContent));
}
}
