import { Component, Input, effect, signal } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchService } from '../../signals/search.service';
import { LoginService } from '../../signals/login.service';


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
  searchKey: string = ''




  constructor( private searchService: SearchService, private router: Router) {

  }
  onSearchKeyChange(value: string): void {
    this.searchKey = value;

    if (this.router.url.startsWith('/users')) {
      this.searchService.UserSearchKey.set(this.searchKey);
    } else if (this.router.url.startsWith('/transaction')) {
      this.searchService.TransactionSearchKey.set(this.searchKey);
    }
    else if (this.router.url.startsWith('/admins')) {
      this.searchService.AdminSearchKey.set(this.searchKey);
    }

    else if (this.router.url.startsWith('/translation/EditingAndProofreading')) {
      this.searchService.EditAndProofReadingSearchKey.set(this.searchKey);
    }
  }
}