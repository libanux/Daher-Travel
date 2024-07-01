import { Component, WritableSignal, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { RouteSignalService } from 'src/app/signals/route.signal';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './error.component.html',
})
export class AppErrorComponent {

  constructor(private routeService:RouteSignalService, private router: Router) {}
prevUrl: string =''
  ngOnInit() {
    const storedUrl = localStorage.getItem('previousUrl');
    if (storedUrl !== null) {
      this.prevUrl = storedUrl;  // Type assertion is not needed here
    }
  }
  

  goToPrevious() {
  
    if(localStorage.getItem('TICKET')!=null){
     
        this.router.navigateByUrl(this.prevUrl);
      
    }
    else if(localStorage.getItem('TICKET')==''){
      this.router.navigateByUrl('login');
    }else{
      this.router.navigateByUrl('login');
    }
  
  }
}
