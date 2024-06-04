import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {


  @Input() seachPosition: string = '';
  @Input() searchBy: string = '';
  searchKey: string = ''
  enterClick = false;
  showSearchBar: boolean = false;



  constructor(private router: Router) { }
  ngOnInit(): void {
    
  }


  //SEND THE SEARCH KEY OF THE CURRENTLY SEARCHBAR
  onSearchKeyChange(value: string): void {
    
  }
}
