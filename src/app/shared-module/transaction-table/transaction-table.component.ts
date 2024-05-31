import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service-folder/general.service';
import { PaymentService } from '../../service-folder/payment.service';
@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {
 
  @Output() currentPageChoosen = new EventEmitter<number>();
  @Input() showDropdowns = true;
  @Input() showTitle = true;
  
  status: string = "ACCEPTED"
  transArray: any [] = [];
  
  ArrayLength = 0;

  showShimmer = true;
  currentPage = 0;
  showPaging = true;

  travelData: {
    fullName: string;
    profession: string;
    nationality: string;
    desiredCountry: string;
    gender: string;
    createdAt: string;
    note: string;
    result: string;
    downloadFile: string;
    status: string;
    action: string;
}[] = [
    {
        fullName: "John Doe",
        profession: "Engineer",
        nationality: "American",
        desiredCountry: "Canada",
        gender: "Male",
        createdAt: "2024-05-31",
        note: "Needs visa sponsorship",
        result: "Approved",
        downloadFile: "passport.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Jane Smith",
        profession: "Teacher",
        nationality: "British",
        desiredCountry: "Australia",
        gender: "Female",
        createdAt: "2024-05-30",
        note: "Looking for job opportunities",
        result: "Pending",
        downloadFile: "cv.pdf",
        status: "In Progress",
        action: "Edit"
    },
    {
        fullName: "Alice Johnson",
        profession: "Software Developer",
        nationality: "Canadian",
        desiredCountry: "Germany",
        gender: "Female",
        createdAt: "2024-05-29",
        note: "Seeking work visa",
        result: "Pending",
        downloadFile: "resume.pdf",
        status: "In Progress",
        action: "Edit"
    },
    {
        fullName: "David Lee",
        profession: "Architect",
        nationality: "Korean",
        desiredCountry: "United States",
        gender: "Male",
        createdAt: "2024-05-28",
        note: "Planning vacation",
        result: "Approved",
        downloadFile: "flight_ticket.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Maria Garcia",
        profession: "Nurse",
        nationality: "Mexican",
        desiredCountry: "Spain",
        gender: "Female",
        createdAt: "2024-05-27",
        note: "Studying Spanish",
        result: "Approved",
        downloadFile: "visa.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Ahmed Mohamed",
        profession: "Doctor",
        nationality: "Egyptian",
        desiredCountry: "Saudi Arabia",
        gender: "Male",
        createdAt: "2024-05-26",
        note: "Job relocation",
        result: "Approved",
        downloadFile: "contract.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Sophia Nguyen",
        profession: "Marketing Manager",
        nationality: "Vietnamese",
        desiredCountry: "Japan",
        gender: "Female",
        createdAt: "2024-05-25",
        note: "Business trip",
        result: "Approved",
        downloadFile: "hotel_reservation.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Luca Rossi",
        profession: "Chef",
        nationality: "Italian",
        desiredCountry: "France",
        gender: "Male",
        createdAt: "2024-05-24",
        note: "Culinary tour",
        result: "Approved",
        downloadFile: "travel_guide.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Emily Brown",
        profession: "Graphic Designer",
        nationality: "Australian",
        desiredCountry: "New Zealand",
        gender: "Female",
        createdAt: "2024-05-23",
        note: "Exploring job opportunities",
        result: "Pending",
        downloadFile: "portfolio.pdf",
        status: "In Progress",
        action: "Edit"
    },
    {
        fullName: "Mohammed Ahmed",
        profession: "Accountant",
        nationality: "Saudi Arabian",
        desiredCountry: "United Arab Emirates",
        gender: "Male",
        createdAt: "2024-05-22",
        note: "Business conference",
        result: "Approved",
        downloadFile: "conference_ticket.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Sara Müller",
        profession: "Translator",
        nationality: "German",
        desiredCountry: "Switzerland",
        gender: "Female",
        createdAt: "2024-05-21",
        note: "Attending language course",
        result: "Approved",
        downloadFile: "language_certificate.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Daniel Kim",
        profession: "Consultant",
        nationality: "South Korean",
        desiredCountry: "Singapore",
        gender: "Male",
        createdAt: "2024-05-20",
        note: "Business trip",
        result: "Approved",
        downloadFile: "business_contract.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Lina Petrova",
        profession: "Journalist",
        nationality: "Russian",
        desiredCountry: "United Kingdom",
        gender: "Female",
        createdAt: "2024-05-19",
        note: "Reporting assignment",
        result: "Approved",
        downloadFile: "press_pass.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Ahmed Ali",
        profession: "Engineer",
        nationality: "Emirati",
        desiredCountry: "Canada",
        gender: "Male",
        createdAt: "2024-05-18",
        note: "Seeking job opportunities",
        result: "Pending",
        downloadFile: "resume.pdf",
        status: "In Progress",
        action: "Edit"
    },
    {
        fullName: "Sophie Dupont",
        profession: "Fashion Designer",
        nationality: "French",
        desiredCountry: "Italy",
        gender: "Female",
        createdAt: "2024-05-17",
        note: "Fashion show",
        result: "Approved",
        downloadFile: "invitation.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Ali Khan",
        profession: "Software Developer",
        nationality: "Pakistani",
        desiredCountry: "United States",
        gender: "Male",
        createdAt: "2024-05-16",
        note: "Job relocation",
        result: "Approved",
        downloadFile: "contract.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Elena Ivanova",
        profession: "Accountant",
        nationality: "Russian",
        desiredCountry: "Germany",
        gender: "Female",
        createdAt: "2024-05-15",
        note: "Business trip",
        result: "Approved",
        downloadFile: "business_plan.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Carlos Martinez",
        profession: "Chef",
        nationality: "Spanish",
        desiredCountry: "France",
        gender: "Male",
        createdAt: "2024-05-14",
        note: "Culinary tour",
        result: "Approved",
        downloadFile: "recipe_book.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Anna Kowalski",
        profession: "Teacher",
        nationality: "Polish",
        desiredCountry: "United Kingdom",
        gender: "Female",
        createdAt: "2024-05-13",
        note: "English language course",
        result: "Approved",
        downloadFile: "certificate.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Muhammad Rahman",
        profession: "Doctor",
        nationality: "Bangladeshi",
        desiredCountry: "Canada",
        gender: "Male",
        createdAt: "2024-05-12",
        note: "Medical conference",
        result: "Approved",
        downloadFile: "conference_pass.pdf",
        status: "Completed",
        action: "View"
    },
    {
        fullName: "Yuki Tanaka",
        profession: "Graphic Designer",
        nationality: "Japanese",
        desiredCountry: "Australia",
        gender: "Female",
        createdAt: "2024-05-11",
        note: "Working holiday",
        result: "Approved",
        downloadFile: "work_permit.pdf",
        status: "Completed",
        action: "View"
    }
];

  
  constructor(private router:Router, private apiService : GeneralService, private transactionService : PaymentService){ 
    this.ArrayLength = Math.ceil(this.travelData.length / this.apiService.PageSizing);
  }

  ngOnInit() {
    this.FETCH_TRANSACTION(0)
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_TRANSACTION(this.currentPage)
  }


  FETCH_TRANSACTION(pageNumber: number): void {
    this.transactionService.GET_PAYMENTS_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.transArray = response.my_Payments.first;
        this.ArrayLength = Math.ceil(response.my_Payments.second / this.apiService.PageSizing);
        // this.pageNumber = Math.ceil(this.length / this.apiService.PAGING_SIZE);
      },
      error: (error) => {this.showShimmer = false;},
      complete: () => {this.showShimmer = false;}
    });
  }
  
  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

