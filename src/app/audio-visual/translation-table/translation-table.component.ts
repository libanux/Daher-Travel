import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
@Component({
  selector: 'app-translation-table',
  templateUrl: './translation-table.component.html',
  styleUrl: './translation-table.component.css'
})
export class TranslationTableComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showPaging: boolean = true ;

  @Output() currentPageChoosen = new EventEmitter<number>();

  status: string = "ACCEPTED"

  private apiUrl = '';
  Array_Length = 0
  Translation_Array: any[] = [];
  showShimmer: boolean = false;
  currentPage = 0;
   transactions = [
    {
      transactionId: 1,
      transactionType: "Invoice",
      date: "2024-05-01",
      dueDate: "2024-06-01",
      amount: 500.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "John Doe"
    },
    {
      transactionId: 2,
      transactionType: "Payment",
      date: "2024-05-05",
      dueDate: null,
      amount: 500.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Jane Smith",
      paymentMethod: "Credit Card",
      relatedInvoiceId: "T001"
    },
    {
      transactionId: 3,
      transactionType: "Invoice",
      date: "2024-05-10",
      dueDate: "2024-06-10",
      amount: 300.00,
      currency: "USD",
      status: "Overdue",
      customerPayer: "Acme Corp"
    },
    {
      transactionId: 4,
      transactionType: "Payment",
      date: "2024-05-15",
      dueDate: null,
      amount: 300.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Acme Corp",
      paymentMethod: "Bank Transfer",
      relatedInvoiceId: "T003"
    },
    {
      transactionId: 5,
      transactionType: "Invoice",
      date: "2024-05-20",
      dueDate: "2024-06-20",
      amount: 750.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Global Industries"
    },
    {
      transactionId: 6,
      transactionType: "Payment",
      date: "2024-05-25",
      dueDate: null,
      amount: 750.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Global Industries",
      paymentMethod: "Credit Card",
      relatedInvoiceId: "T005"
    },
    {
      transactionId: 7,
      transactionType: "Invoice",
      date: "2024-06-01",
      dueDate: "2024-07-01",
      amount: 1200.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Tech Solutions"
    },
    {
      transactionId: 8,
      transactionType: "Payment",
      date: "2024-06-05",
      dueDate: null,
      amount: 1200.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Tech Solutions",
      paymentMethod: "Bank Transfer",
      relatedInvoiceId: "T007"
    },
    {
      transactionId: 9,
      transactionType: "Invoice",
      date: "2024-06-10",
      dueDate: "2024-07-10",
      amount: 450.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Startup Inc."
    },
    {
      transactionId: 10,
      transactionType: "Payment",
      date: "2024-06-15",
      dueDate: null,
      amount: 450.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Startup Inc.",
      paymentMethod: "Credit Card",
      relatedInvoiceId: "T009"
    },
    {
      transactionId: 11,
      transactionType: "Invoice",
      date: "2024-06-20",
      dueDate: "2024-07-20",
      amount: 680.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Retail Co."
    },
    {
      transactionId: 12,
      transactionType: "Payment",
      date: "2024-06-25",
      dueDate: null,
      amount: 680.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Retail Co.",
      paymentMethod: "Bank Transfer",
      relatedInvoiceId: "T011"
    },
    {
      transactionId: 13,
      transactionType: "Invoice",
      date: "2024-07-01",
      dueDate: "2024-08-01",
      amount: 950.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Marketing LLC"
    },
    {
      transactionId: 14,
      transactionType: "Payment",
      date: "2024-07-05",
      dueDate: null,
      amount: 950.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Marketing LLC",
      paymentMethod: "Credit Card",
      relatedInvoiceId: "T013"
    },
    {
      transactionId: 15,
      transactionType: "Invoice",
      date: "2024-07-10",
      dueDate: "2024-08-10",
      amount: 320.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Development Studio"
    },
    {
      transactionId: 16,
      transactionType: "Payment",
      date: "2024-07-15",
      dueDate: null,
      amount: 320.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Development Studio",
      paymentMethod: "Bank Transfer",
      relatedInvoiceId: "T015"
    },
    {
      transactionId: 17,
      transactionType: "Invoice",
      date: "2024-07-20",
      dueDate: "2024-08-20",
      amount: 800.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Design Firm"
    },
    {
      transactionId: 18,
      transactionType: "Payment",
      date: "2024-07-25",
      dueDate: null,
      amount: 800.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Design Firm",
      paymentMethod: "Credit Card",
      relatedInvoiceId: "T017"
    },
    {
      transactionId: 19,
      transactionType: "Invoice",
      date: "2024-08-01",
      dueDate: "2024-09-01",
      amount: 410.00,
      currency: "USD",
      status: "Unpaid",
      customerPayer: "Consulting Group"
    },
    {
      transactionId: 20,
      transactionType: "Payment",
      date: "2024-08-05",
      dueDate: null,
      amount: 410.00,
      currency: "USD",
      status: "Completed",
      customerPayer: "Consulting Group",
      paymentMethod: "Bank Transfer",
      relatedInvoiceId: "T019"
    }
  ];

  constructor(private apiService : GeneralService, private router: Router, private translationsService: TranslationService) { }

  ngOnInit(): void {
    this.Array_Length = Math.ceil(this.transactions.length / this.apiService.PageSizing);
  //  this.FETCH_TRANSLATION(0);
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_TRANSLATION(this.currentPage)
  }

  FETCH_TRANSLATION(page: number){
    // this.translationsService.GET_WEB_TRANSLATION_PER_PAGE(page).subscribe({
    //   next: (response: any) => {
    //     this.webTranslationArray = response.my_QUOTE_TRANSLATIONS.first;
    //     this.webTranslationArrayLength = Math.ceil(response.my_QUOTE_TRANSLATIONS.second / this.apiService.PageSizing);
    //   },
    //   error: (error: any) => { this.showShimmer = false; },
    //   complete: () => { this.showShimmer = false; }
    // });
  }
  

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}