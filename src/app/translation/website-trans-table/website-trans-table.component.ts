import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
@Component({
  selector: 'app-website-trans-table',
  templateUrl: './website-trans-table.component.html',
  styleUrl: './website-trans-table.component.css'
})
export class WebsiteTransTableComponent implements OnInit {

  @Input() showDropdowns = true;
  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  status: string = "ACCEPTED"


   tourismVisaRecords = [
    {
        recordID: 1,
        name: "John Doe",
        destination: "France",
        travelOrApplicationDate: "2024-06-01",
        packageOrVisaType: "Tourist Package - Standard",
        accommodationOrVisaStatus: "Hotel Paris Inn",
        activitiesOrPassportNumber: "Sightseeing, Museum Visit",
        totalCostOrVisaFees: 1500,
        status: "Confirmed"
    },
    {
        recordID: 2,
        name: "Jane Smith",
        destination: "USA",
        travelOrApplicationDate: "2024-06-03",
        packageOrVisaType: "Business Visa",
        accommodationOrVisaStatus: "Approved",
        activitiesOrPassportNumber: "AB1234567",
        totalCostOrVisaFees: 200,
        status: "Approved"
    },
    {
        recordID: 3,
        name: "Michael Brown",
        destination: "Japan",
        travelOrApplicationDate: "2024-06-10",
        packageOrVisaType: "Tourist Package - Premium",
        accommodationOrVisaStatus: "Tokyo Grand Hotel",
        activitiesOrPassportNumber: "City Tour, Sushi Workshop",
        totalCostOrVisaFees: 3000,
        status: "Pending"
    },
    {
        recordID: 4,
        name: "Emily Davis",
        destination: "UK",
        travelOrApplicationDate: "2024-06-12",
        packageOrVisaType: "Student Visa",
        accommodationOrVisaStatus: "Pending",
        activitiesOrPassportNumber: "CD2345678",
        totalCostOrVisaFees: 350,
        status: "Pending"
    },
    {
        recordID: 5,
        name: "Daniel Wilson",
        destination: "Australia",
        travelOrApplicationDate: "2024-06-20",
        packageOrVisaType: "Tourist Package - Adventure",
        accommodationOrVisaStatus: "Sydney Harbor Hotel",
        activitiesOrPassportNumber: "Surfing, Outback Tour",
        totalCostOrVisaFees: 2200,
        status: "Confirmed"
    },
    {
        recordID: 6,
        name: "Olivia Johnson",
        destination: "Canada",
        travelOrApplicationDate: "2024-06-22",
        packageOrVisaType: "Work Visa",
        accommodationOrVisaStatus: "Approved",
        activitiesOrPassportNumber: "EF3456789",
        totalCostOrVisaFees: 250,
        status: "Approved"
    },
    {
        recordID: 7,
        name: "James Miller",
        destination: "Italy",
        travelOrApplicationDate: "2024-06-15",
        packageOrVisaType: "Tourist Package - Luxury",
        accommodationOrVisaStatus: "Rome Royal Suites",
        activitiesOrPassportNumber: "Vatican Tour, Wine Tasting",
        totalCostOrVisaFees: 5000,
        status: "Confirmed"
    },
    {
        recordID: 8,
        name: "Sophia Martinez",
        destination: "Spain",
        travelOrApplicationDate: "2024-06-25",
        packageOrVisaType: "Tourist Package - Standard",
        accommodationOrVisaStatus: "Barcelona Beach Resort",
        activitiesOrPassportNumber: "City Tour, Flamenco Show",
        totalCostOrVisaFees: 1800,
        status: "Pending"
    },
    {
        recordID: 9,
        name: "William Anderson",
        destination: "Germany",
        travelOrApplicationDate: "2024-06-28",
        packageOrVisaType: "Tourist Visa",
        accommodationOrVisaStatus: "Approved",
        activitiesOrPassportNumber: "GH4567890",
        totalCostOrVisaFees: 80,
        status: "Approved"
    },
    {
        recordID: 10,
        name: "Ava Thomas",
        destination: "Brazil",
        travelOrApplicationDate: "2024-07-01",
        packageOrVisaType: "Tourist Package - Adventure",
        accommodationOrVisaStatus: "Rio Carnival Hotel",
        activitiesOrPassportNumber: "Jungle Tour, Beach Party",
        totalCostOrVisaFees: 2700,
        status: "Pending"
    },
    {
        recordID: 11,
        name: "Liam Taylor",
        destination: "Mexico",
        travelOrApplicationDate: "2024-07-03",
        packageOrVisaType: "Tourist Package - Standard",
        accommodationOrVisaStatus: "Cancun Beach Hotel",
        activitiesOrPassportNumber: "Mayan Ruins, Snorkeling",
        totalCostOrVisaFees: 1500,
        status: "Confirmed"
    },
    {
        recordID: 12,
        name: "Mia White",
        destination: "India",
        travelOrApplicationDate: "2024-07-07",
        packageOrVisaType: "Tourist Visa",
        accommodationOrVisaStatus: "Pending",
        activitiesOrPassportNumber: "IJ5678901",
        totalCostOrVisaFees: 100,
        status: "Pending"
    },
    {
        recordID: 13,
        name: "Noah Harris",
        destination: "China",
        travelOrApplicationDate: "2024-07-09",
        packageOrVisaType: "Business Visa",
        accommodationOrVisaStatus: "Approved",
        activitiesOrPassportNumber: "KL6789012",
        totalCostOrVisaFees: 300,
        status: "Approved"
    },
    {
        recordID: 14,
        name: "Isabella Clark",
        destination: "Thailand",
        travelOrApplicationDate: "2024-07-12",
        packageOrVisaType: "Tourist Package - Luxury",
        accommodationOrVisaStatus: "Bangkok Palace Hotel",
        activitiesOrPassportNumber: "Temple Tour, Cooking Class",
        totalCostOrVisaFees: 4000,
        status: "Confirmed"
    },
    {
        recordID: 15,
        name: "Lucas Lewis",
        destination: "South Africa",
        travelOrApplicationDate: "2024-07-14",
        packageOrVisaType: "Tourist Package - Adventure",
        accommodationOrVisaStatus: "Cape Town Lodge",
        activitiesOrPassportNumber: "Safari, Wine Tasting",
        totalCostOrVisaFees: 3500,
        status: "Pending"
    },
    {
        recordID: 16,
        name: "Amelia Robinson",
        destination: "New Zealand",
        travelOrApplicationDate: "2024-07-18",
        packageOrVisaType: "Tourist Package - Standard",
        accommodationOrVisaStatus: "Auckland Central Hotel",
        activitiesOrPassportNumber: "City Tour, Whale Watching",
        totalCostOrVisaFees: 2000,
        status: "Confirmed"
    },
    {
        recordID: 17,
        name: "Henry Walker",
        destination: "Egypt",
        travelOrApplicationDate: "2024-07-20",
        packageOrVisaType: "Tourist Visa",
        accommodationOrVisaStatus: "Pending",
        activitiesOrPassportNumber: "MN7890123",
        totalCostOrVisaFees: 50,
        status: "Pending"
    },
    {
        recordID: 18,
        name: "Evelyn Hall",
        destination: "Turkey",
        travelOrApplicationDate: "2024-07-22",
        packageOrVisaType: "Tourist Package - Luxury",
        accommodationOrVisaStatus: "Istanbul Grand Hotel",
        activitiesOrPassportNumber: "City Tour, Spa Day",
        totalCostOrVisaFees: 3200,
        status: "Confirmed"
    },
    {
        recordID: 19,
        name: "Alexander Young",
        destination: "Russia",
        travelOrApplicationDate: "2024-07-25",
        packageOrVisaType: "Business Visa",
        accommodationOrVisaStatus: "Approved",
        activitiesOrPassportNumber: "OP8901234",
        totalCostOrVisaFees: 250,
        status: "Approved"
    },
    {
        recordID: 20,
        name: "Charlotte King",
        destination: "Greece",
        travelOrApplicationDate: "2024-07-27",
        packageOrVisaType: "Tourist Package - Standard",
        accommodationOrVisaStatus: "Athens Seaside Hotel",
        activitiesOrPassportNumber: "City Tour, Island Hopping",
        totalCostOrVisaFees: 2100,
        status: "Pending"
    }
];

  webTranslationArrayLength = 0
  webTranslationArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;

  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService) { }

  ngOnInit(): void {
    this.webTranslationArrayLength = Math.ceil(this.tourismVisaRecords.length / this.apiService.PageSizing);
  //  this.FETCH_WEB_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_WEB_TRANSLATION(this.currentPage)
  }

  FETCH_WEB_TRANSLATION(page: number){
    this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(page).subscribe({
      next: (response: any) => {
        this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
        this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }


}
