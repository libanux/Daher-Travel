import { Component, HostListener, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input () logo = './assets/logo-noBG.png'

  uid : string =''
  showGenders=false;
  selectedImage: File | null = null;
  showShimmer = false;
  showLogo: boolean = true;
  constructor(private router: Router, private renderer: Renderer2) { }
  
  ngOnInit(): void {
    this.checkScreenWidth();
    setTimeout(() => { this.showShimmer = false;}, 3000);
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }
  
  private checkScreenWidth(): void {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    if (screenWidth > 500) {
      this.DontShowGender();
    } 
    else {
     
    }
  }
  
  logout() {
    localStorage.removeItem('uid');
    localStorage.removeItem('accessToken');
  }
    
  // function for routing
  moveToRoute(route:string){
    this.router.navigate([route]).then(() => {
      this.showGenders=!this.showGenders;
      window.scrollTo(0, 0)
    });
  }
  
  // Define the isActive method to color the links in the sidebar
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  
  showGender(){
    this.showGenders=!this.showGenders;
  }
  
  DontShowGender(){
    this.showGenders = false;
  }
  
}
