import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralService } from '../../service-folder/general.service';

@Component({
  selector: 'app-content-services-table',
  templateUrl: './content-services-table.component.html',
  styleUrl: './content-services-table.component.css'
})
export class ContentServicesTableComponent {

  dropTitle1: string = ' Type';
  dropTitle2: string = 'Translated';
  dropTitle3: string = 'Status';
  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  status: string = "ACCEPTED"

  private apiUrl = '';
  Array_Length = 0
  Translation_Array: any[] = [];
  showShimmer: boolean = false;
  currentPage = 0;

  dropOptions1: string[] = ["All", "Blog Posts", "Newsletters & Press Releases", "Social media content writing", "Copywriting"];
  dropOptions2: string[] = ["All", "Arabic", "English", "French"];
  dropOptions3: string[] = ["All", "Completed", "Inprogress", "Pending"];


   transportationServices= [
    {
      serviceName: "City Bus",
      serviceId: 1,
      routes: "Downtown, Uptown, Suburbs",
      currentStatus: "On Time",
      fare: 2.5,
      onTimePerformance: 95,
      customerFeedbackRating: 4.5,
      customerFeedbackComments: "Very reliable service.",
    },
    {
      serviceName: "Metro Rail",
      serviceId: 2,
      routes: "Central Station, East End, West End",
      currentStatus: "Delayed",
      fare: 3.0,
      onTimePerformance: 85,
      customerFeedbackRating: 4.2,
      customerFeedbackComments: "Fast but sometimes crowded.",
    },
    {
      serviceName: "Airport Shuttle",
      serviceId: 3,
      routes: "Airport, Downtown Hotels",
      currentStatus: "On Time",
      fare: 5.0,
      onTimePerformance: 98,
      customerFeedbackRating: 4.8,
      customerFeedbackComments: "Convenient for travelers.",
    },
    {
      serviceName: "Intercity Bus",
      serviceId: 4,
      routes: "City A, City B, City C",
      currentStatus: "On Time",
      fare: 10.0,
      onTimePerformance: 90,
      customerFeedbackRating: 4.1,
      customerFeedbackComments: "Comfortable for long distances.",
    },
    {
      serviceName: "Ride-Sharing",
      serviceId: 5,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 15.0,
      onTimePerformance: 88,
      customerFeedbackRating: 4.7,
      customerFeedbackComments: "Great service and drivers.",
    },
    {
      serviceName: "Bicycle Rental",
      serviceId: 6,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 1.0,
      onTimePerformance: 99,
      customerFeedbackRating: 4.9,
      customerFeedbackComments: "Affordable and eco-friendly.",
    },
    {
      serviceName: "Car Rental",
      serviceId: 7,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 25.0,
      onTimePerformance: 92,
      customerFeedbackRating: 4.4,
      customerFeedbackComments: "Wide range of cars available.",
    },
    {
      serviceName: "Electric Scooter",
      serviceId: 8,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 2.0,
      onTimePerformance: 94,
      customerFeedbackRating: 4.6,
      customerFeedbackComments: "Fun and easy to use.",
    },
    {
      serviceName: "Suburban Train",
      serviceId: 9,
      routes: "City Center, Suburbs",
      currentStatus: "On Time",
      fare: 3.5,
      onTimePerformance: 91,
      customerFeedbackRating: 4.3,
      customerFeedbackComments: "Convenient for daily commute.",
    },
    {
      serviceName: "Taxi Service",
      serviceId: 10,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 10.0,
      onTimePerformance: 89,
      customerFeedbackRating: 4.5,
      customerFeedbackComments: "Quick and reliable.",
    },
    {
      serviceName: "Ferry Service",
      serviceId: 11,
      routes: "Harbor, Island",
      currentStatus: "On Time",
      fare: 3.0,
      onTimePerformance: 92,
      customerFeedbackRating: 4.7,
      customerFeedbackComments: "Scenic and efficient.",
    },
    {
      serviceName: "Light Rail",
      serviceId: 12,
      routes: "Downtown, Suburbs",
      currentStatus: "Delayed",
      fare: 2.5,
      onTimePerformance: 80,
      customerFeedbackRating: 4.1,
      customerFeedbackComments: "Affordable but often delayed.",
    },
    {
      serviceName: "Vanpool",
      serviceId: 13,
      routes: "City Center, Industrial Park",
      currentStatus: "On Time",
      fare: 6.0,
      onTimePerformance: 95,
      customerFeedbackRating: 4.6,
      customerFeedbackComments: "Great for group travel.",
    },
    {
      serviceName: "Long-Distance Train",
      serviceId: 14,
      routes: "City A, City B",
      currentStatus: "On Time",
      fare: 20.0,
      onTimePerformance: 93,
      customerFeedbackRating: 4.4,
      customerFeedbackComments: "Comfortable for long journeys.",
    },
    {
      serviceName: "Cable Car",
      serviceId: 15,
      routes: "Tourist Spots",
      currentStatus: "On Time",
      fare: 4.0,
      onTimePerformance: 97,
      customerFeedbackRating: 4.8,
      customerFeedbackComments: "Fun and scenic.",
    },
    {
      serviceName: "Helicopter Taxi",
      serviceId: 16,
      routes: "Citywide",
      currentStatus: "Available",
      fare: 100.0,
      onTimePerformance: 99,
      customerFeedbackRating: 4.9,
      customerFeedbackComments: "Fastest way to travel.",
    },
    {
      serviceName: "Tourist Bus",
      serviceId: 17,
      routes: "City Attractions",
      currentStatus: "On Time",
      fare: 15.0,
      onTimePerformance: 95,
      customerFeedbackRating: 4.7,
      customerFeedbackComments: "Great for tourists.",
    },
    {
      serviceName: "School Bus",
      serviceId: 18,
      routes: "Residential Areas, Schools",
      currentStatus: "On Time",
      fare: 1.0,
      onTimePerformance: 99,
      customerFeedbackRating: 4.5,
      customerFeedbackComments: "Reliable for kids.",
    },
    {
      serviceName: "Freight Train",
      serviceId: 19,
      routes: "Industrial Areas",
      currentStatus: "On Time",
      fare: 50.0,
      onTimePerformance: 92,
      customerFeedbackRating: 4.3,
      customerFeedbackComments: "Efficient for goods transport.",
    },
    {
      serviceName: "Luxury Coach",
      serviceId: 20,
      routes: "City A, City B",
      currentStatus: "On Time",
      fare: 30.0,
      onTimePerformance: 94,
      customerFeedbackRating: 4.7,
      customerFeedbackComments: "Comfortable and luxurious.",
    }
  ];

  constructor(private apiService : GeneralService) { }

  ngOnInit(): void {
    this.Array_Length = Math.ceil(this.transportationServices.length / this.apiService.PageSizing);
  //  this.FETCH_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)

  }
}
