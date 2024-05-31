import { Component, EventEmitter, Input, OnInit, Output, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationService } from '../../service-folder/translation.service';
import { DropdownService } from '../../signals/dropdown.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
@Component({
  selector: 'app-document-trans-table',
  templateUrl: './document-trans-table.component.html',
  styleUrl: './document-trans-table.component.css'
})
export class DocumentTransTableComponent implements OnInit {

  @Input() showform = false;
  @Input() showPaging: boolean = true;
  @Input() currentPage = 0;

  translationArray: any[] = [];
  translationArrayLength = 0;
  showShimmer: boolean = true;

  selected_Translation = signal(0);

  status: string = "ACCEPTED"


  dropTitle1: string = 'Nationalty';
  dropTitle2: string = 'Gender';
  dropTitle3: string = 'Status';

  dropOptions1: string[] = ["All", "Lebanese", "Other",];
  dropOptions2: string[] = ["All", "Male", "Female"];
  dropOptions3: string[] = ["All", "Completed", "Inprogress", "Pending"];

  filter1: string = ''
  filter2: string = ''
  filter3: string = ''

   students= [
    {
      fullName: "John Doe",
      nationality: "American",
      desiredCountry: "Canada",
      gender: "Male",
      createdAt: "2024-05-31", // Sample date format
      note: "Excellent student",
      result: "Accepted",
      studentId: 1,
    },
    {
      fullName: "Alice Smith",
      nationality: "British",
      desiredCountry: "Australia",
      gender: "Female",
      createdAt: "2024-05-30", // Sample date format
      note: "Good student",
      result: "Rejected",
      studentId: 2,
    },
    {
      fullName: "Michael Johnson",
      nationality: "Canadian",
      desiredCountry: "United States",
      gender: "Male",
      createdAt: "2024-05-29", // Sample date format
      note: "Hardworking student",
      result: "Accepted",
      studentId: 3,
    },
    {
      fullName: "Emma Brown",
      nationality: "American",
      desiredCountry: "Germany",
      gender: "Female",
      createdAt: "2024-05-28", // Sample date format
      note: "Average student",
      result: "Rejected",
      studentId: 4,
    },
    {
      fullName: "William Wilson",
      nationality: "Australian",
      desiredCountry: "France",
      gender: "Male",
      createdAt: "2024-05-27", // Sample date format
      note: "Talented student",
      result: "Accepted",
      studentId: 5,
    },
    {
      fullName: "Sophia Taylor",
      nationality: "Canadian",
      desiredCountry: "Italy",
      gender: "Female",
      createdAt: "2024-05-26", // Sample date format
      note: "Dedicated student",
      result: "Rejected",
      studentId: 6,
    },
    {
      fullName: "James Miller",
      nationality: "British",
      desiredCountry: "Spain",
      gender: "Male",
      createdAt: "2024-05-25", // Sample date format
      note: "Creative student",
      result: "Accepted",
      studentId: 7,
    },
    {
      fullName: "Olivia Martinez",
      nationality: "American",
      desiredCountry: "Japan",
      gender: "Female",
      createdAt: "2024-05-24", // Sample date format
      note: "Energetic student",
      result: "Rejected",
      studentId: 8,
    },
    {
      fullName: "Benjamin Garcia",
      nationality: "Mexican",
      desiredCountry: "Switzerland",
      gender: "Male",
      createdAt: "2024-05-23", // Sample date format
      note: "Friendly student",
      result: "Accepted",
      studentId: 9,
    },
    {
      fullName: "Charlotte Rodriguez",
      nationality: "Spanish",
      desiredCountry: "Netherlands",
      gender: "Female",
      createdAt: "2024-05-22", // Sample date format
      note: "Helpful student",
      result: "Rejected",
      studentId: 10,
    },
    // Add more records here
  ];

  constructor(private apiService: GeneralService, private dropService: DropdownService, private translationService: TranslationService, private translationSignal: TranslationSignalService, private router: Router) {
    effect(() => {
      this.filter1 = this.dropService.DropDown1();
      this.filter2 = this.dropService.DropDown2();
      this.filter3 = this.dropService.DropDown3();
      this.fetchTranslations();
    });
  }

  ngOnInit(): void {
    this.translationArrayLength = Math.ceil(this.students.length/ this.apiService.PageSizing);
    this.selected_Translation = this.translationSignal.selected_Translation_ID;
    this.fetchTranslations();
  }


  fetchTranslations(): void {
    this.translationService.GET_TRANSLATION_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.translationArray = response.my_TranslationsOrders.first;
        this.translationArrayLength = Math.ceil(response.my_TranslationsOrders.second / this.apiService.PageSizing);
      },
      error: (error) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }

  @Output() currentPageChoosen = new EventEmitter<number>();

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage);
    this.fetchTranslations();
  }


  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
