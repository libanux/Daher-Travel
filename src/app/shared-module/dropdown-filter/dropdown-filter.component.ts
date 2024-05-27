import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DropdownService } from '../../signals/dropdown.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements OnInit {

  //TITLE & OPTIONS OF DROPDOWN 1
  @Input() dropTitle: string = ''
  @Input() dropOptions: string[] = []

  //TITLE & OPTIONS OF DROPDOWN 2
  @Input() dropTitle1: string = ''
  @Input() dropOptions1: string[] = []

  //TITLE & OPTIONS OF DROPDOWN 3
  @Input() dropTitle2: string = ''
  @Input() dropOptions2: string[] = []

  //FLAGS TO SHOW DROPDOWN
  @Input() showDrop1: boolean = true;
  @Input() showDrop2: boolean = true;
  @Input() showDrop3: boolean = true;


  //SELECTED OPTIONS VALUES
  selectedOption1: string = 'All';
  selectedOption2: string = 'All';
  selectedOption3: string = 'All';

  //DROPDOWN STATUS
  dropdownOpen1: boolean = false;
  dropdownOpen2: boolean = false;
  dropdownOpen3: boolean = false;


  @ViewChild('dropdownContainer1', { static: true })
  dropdownContainer1!: ElementRef<HTMLElement>;

  constructor(private dropService: DropdownService) { }

  ngOnInit(): void {
    this.dropService.DropDown1.set('');
    this.dropService.DropDown2.set('');
    this.dropService.DropDown3.set('');
  }




  //TOGGLE DROPDOWN 1
  toggleDropdown1() {
    this.dropdownOpen1 = !this.dropdownOpen1;
  }

  //TOGGLE DROPDOWN 2
  toggleDropdown2() {
    this.dropdownOpen2 = !this.dropdownOpen2;
  }

  //TOGGLE DROPDOWN 3
  toggleDropdown3() {
    this.dropdownOpen3 = !this.dropdownOpen3;
  }


  //TO CLOSE THE DROPDOWN WHEN CLICKING OUTSIDE IT
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {

    // Check if clicked outside dropdown 1 container
    if (!(this.dropdownContainer1?.nativeElement?.contains(event.target as Node) || event.target === this.dropdownContainer1?.nativeElement)) {
      this.dropdownOpen1 = false;
      this.dropdownOpen2 = false;
      this.dropdownOpen3 = false;

    }
  }

  //DROPDOWN 1 CHANGE
  onDrop1Change(option: string) {
    this.selectedOption1 = option;
    if (option == "All") {
      this.dropService.DropDown1.set('');
    } else {
      this.dropService.DropDown1.set(option);
    }
  }

  //DROPDOWN 2 CHANGE
  onDrop2Change(option: string) {
    this.selectedOption2 = option;
    if (option == "All") {
      this.dropService.DropDown2.set('');
    } else {
      this.dropService.DropDown2.set(option);

    }
  }

  //DROPDOWN 3 CHANGE
  onDrop3Change(option: string) {
    this.selectedOption3 = option;
    if (option == "All") {
      this.dropService.DropDown3.set('');
    } else {
      this.dropService.DropDown3.set(option);

    }
  }

}
