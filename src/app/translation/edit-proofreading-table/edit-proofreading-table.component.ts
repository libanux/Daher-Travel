import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { GeneralService } from '../../service-folder/general.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';

@Component({
  selector: 'app-edit-proofreading-table',
  templateUrl: './edit-proofreading-table.component.html',
  styleUrl: './edit-proofreading-table.component.css'
})
export class EditProofreadingTableComponent {
  @Input() showDropdowns = true;
  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  selected_Translation = signal(0);

  editAndProofreadingArrayLength = 0
  editAndProofreadingArray: any[] = [];
  showShimmer: boolean = true;
  currentPage = 0;


   bookings = [
    {
        bookingID: 1,
        customerName: "John Doe",
        hotelName: "Sunset Resort",
        checkInDate: "2024-06-01",
        checkOutDate: "2024-06-05",
        roomType: "Double",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 500
    },
    {
        bookingID: 2,
        customerName: "Jane Smith",
        hotelName: "Oceanview Hotel",
        checkInDate: "2024-06-03",
        checkOutDate: "2024-06-07",
        roomType: "Single",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 300
    },
    {
        bookingID: 3,
        customerName: "Michael Brown",
        hotelName: "Mountain Inn",
        checkInDate: "2024-06-10",
        checkOutDate: "2024-06-15",
        roomType: "Suite",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 800
    },
    {
        bookingID: 4,
        customerName: "Emily Davis",
        hotelName: "City Hotel",
        checkInDate: "2024-06-12",
        checkOutDate: "2024-06-14",
        roomType: "Double",
        bookingStatus: "Cancelled",
        paymentStatus: "Refunded",
        totalPrice: 400
    },
    {
        bookingID: 5,
        customerName: "Daniel Wilson",
        hotelName: "Lakeside Resort",
        checkInDate: "2024-06-20",
        checkOutDate: "2024-06-25",
        roomType: "Single",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 450
    },
    {
        bookingID: 6,
        customerName: "Olivia Johnson",
        hotelName: "Desert Oasis",
        checkInDate: "2024-06-22",
        checkOutDate: "2024-06-26",
        roomType: "Double",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 500
    },
    {
        bookingID: 7,
        customerName: "James Miller",
        hotelName: "Forest Lodge",
        checkInDate: "2024-06-15",
        checkOutDate: "2024-06-18",
        roomType: "Suite",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 600
    },
    {
        bookingID: 8,
        customerName: "Sophia Martinez",
        hotelName: "Beachfront Hotel",
        checkInDate: "2024-06-25",
        checkOutDate: "2024-06-30",
        roomType: "Double",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 550
    },
    {
        bookingID: 9,
        customerName: "William Anderson",
        hotelName: "Mountain Retreat",
        checkInDate: "2024-06-28",
        checkOutDate: "2024-07-03",
        roomType: "Single",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 400
    },
    {
        bookingID: 10,
        customerName: "Ava Thomas",
        hotelName: "Island Resort",
        checkInDate: "2024-07-01",
        checkOutDate: "2024-07-06",
        roomType: "Suite",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 700
    },
    {
        bookingID: 11,
        customerName: "Liam Taylor",
        hotelName: "Urban Hotel",
        checkInDate: "2024-07-03",
        checkOutDate: "2024-07-05",
        roomType: "Double",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 350
    },
    {
        bookingID: 12,
        customerName: "Mia White",
        hotelName: "Country Inn",
        checkInDate: "2024-07-07",
        checkOutDate: "2024-07-10",
        roomType: "Single",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 250
    },
    {
        bookingID: 13,
        customerName: "Noah Harris",
        hotelName: "Riverfront Hotel",
        checkInDate: "2024-07-09",
        checkOutDate: "2024-07-14",
        roomType: "Suite",
        bookingStatus: "Cancelled",
        paymentStatus: "Refunded",
        totalPrice: 600
    },
    {
        bookingID: 14,
        customerName: "Isabella Clark",
        hotelName: "Lake Hotel",
        checkInDate: "2024-07-12",
        checkOutDate: "2024-07-15",
        roomType: "Double",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 450
    },
    {
        bookingID: 15,
        customerName: "Lucas Lewis",
        hotelName: "Valley Resort",
        checkInDate: "2024-07-14",
        checkOutDate: "2024-07-19",
        roomType: "Single",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 300
    },
    {
        bookingID: 16,
        customerName: "Amelia Robinson",
        hotelName: "Mountain Lodge",
        checkInDate: "2024-07-18",
        checkOutDate: "2024-07-22",
        roomType: "Suite",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 700
    },
    {
        bookingID: 17,
        customerName: "Henry Walker",
        hotelName: "Ocean Resort",
        checkInDate: "2024-07-20",
        checkOutDate: "2024-07-25",
        roomType: "Double",
        bookingStatus: "Cancelled",
        paymentStatus: "Refunded",
        totalPrice: 500
    },
    {
        bookingID: 18,
        customerName: "Evelyn Hall",
        hotelName: "Desert Lodge",
        checkInDate: "2024-07-22",
        checkOutDate: "2024-07-27",
        roomType: "Single",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 350
    },
    {
        bookingID: 19,
        customerName: "Alexander Young",
        hotelName: "City Inn",
        checkInDate: "2024-07-25",
        checkOutDate: "2024-07-28",
        roomType: "Suite",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
        totalPrice: 600
    },
    {
        bookingID: 20,
        customerName: "Charlotte King",
        hotelName: "Forest Resort",
        checkInDate: "2024-07-27",
        checkOutDate: "2024-08-01",
        roomType: "Double",
        bookingStatus: "Pending",
        paymentStatus: "Pending",
        totalPrice: 550
    }
];


  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService,private translationSignal: TranslationSignalService,) { }

  ngOnInit(): void {
    this.editAndProofreadingArrayLength = Math.ceil(this.bookings.length/ this.apiService.PageSizing);
    this.selected_Translation = this.translationSignal.selected_Translation_ID;
  //  this.FETCH_EDITING_AND_PROOFREADING_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_EDITING_AND_PROOFREADING_TRANSLATION(this.currentPage)
  }

  FETCH_EDITING_AND_PROOFREADING_TRANSLATION(page: number){
    this.translationsService.GET_TRANSLATION_ORDER_BY_WHERE_IN_LIST_ADV1(page).subscribe({
      next: (response: any) => {
        this.editAndProofreadingArray = response.my_Translation_Orders.first;
        this.editAndProofreadingArrayLength = Math.ceil(response.my_Translation_Orders.second / this.apiService.PageSizing);
      },
      error: (error: any) => { this.showShimmer = false; },
      complete: () => { this.showShimmer = false; }
    });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
