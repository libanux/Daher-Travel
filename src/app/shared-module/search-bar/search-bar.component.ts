import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  // myForm: FormGroup;
  enterClick = false;

  @Input() seachPosition: string = '';
  @Input() searchBy: string = '';

constructor(
  // private fb: UntypedFormBuilder,
   private router: Router){
     
// this.myForm  = this.fb.group({
//   searchKey: [''],
// });
    
// this.myForm.get('searchKey')?.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
//   // if(this.seachPosition=='ADMIN'){ this.subjectsService.sendAdminSearchKey(searchValue); }
//   // if(this.seachPosition=='ORDER'){ this.subjectsService.sendOrderSearchKey(searchValue); }
//   // if(this.seachPosition=='DRIVER'){ this.subjectsService. sendDriverSearchKey(searchValue);  }

//   if(this.seachPosition=='WINNERS'){   }
//   if(this.seachPosition=='USER'){  }
//   if(this.seachPosition=='PRODUCTS'){   }
// });
// }
  

}}