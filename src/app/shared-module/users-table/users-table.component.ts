import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, effect } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service-folder/user.service';
import { User } from '../../classes/User';
import { SearchService } from '../../signals/search.service';
import { GeneralService } from '../../service-folder/general.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  @Input() showDropdowns = true;
  @Input() showTitle = true;

  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];

   taskData: {
    taskId: number;
    client: string;
    dateCreated: string;
    phoneNumber: string;
    assignedTo: string;
    taskType: string;
    supplier: string;
    costPrice: number;
    sellingPrice: number;
    payment: number;
    netProfit: number;
    status: string;
}[] = [
    {
        taskId: 1,
        client: "John Doe",
        dateCreated: "2024-05-31",
        phoneNumber: "+1234567890",
        assignedTo: "Alice Smith",
        taskType: "Project",
        supplier: "XYZ Company",
        costPrice: 1000,
        sellingPrice: 1500,
        payment: 1200,
        netProfit: 500,
        status: "Completed"
    },
    {
        taskId: 2,
        client: "Jane Smith",
        dateCreated: "2024-05-30",
        phoneNumber: "+9876543210",
        assignedTo: "Bob Johnson",
        taskType: "Support",
        supplier: "ABC Inc.",
        costPrice: 500,
        sellingPrice: 800,
        payment: 600,
        netProfit: 200,
        status: "In Progress"
    },
    {
        taskId: 3,
        client: "David Brown",
        dateCreated: "2024-05-29",
        phoneNumber: "+1122334455",
        assignedTo: "Emily Davis",
        taskType: "Consultation",
        supplier: "ACME Corp.",
        costPrice: 700,
        sellingPrice: 1000,
        payment: 800,
        netProfit: 300,
        status: "Pending"
    },
    {
        taskId: 4,
        client: "Sarah Johnson",
        dateCreated: "2024-05-28",
        phoneNumber: "+9988776655",
        assignedTo: "Michael Wilson",
        taskType: "Development",
        supplier: "Tech Solutions",
        costPrice: 1200,
        sellingPrice: 1800,
        payment: 1400,
        netProfit: 600,
        status: "Completed"
    },
    {
        taskId: 5,
        client: "Anna Lee",
        dateCreated: "2024-05-27",
        phoneNumber: "+1122339988",
        assignedTo: "Emma Thompson",
        taskType: "Training",
        supplier: "Training Experts",
        costPrice: 800,
        sellingPrice: 1200,
        payment: 1000,
        netProfit: 400,
        status: "In Progress"
    },
    {
        taskId: 6,
        client: "Mohammed Ahmed",
        dateCreated: "2024-05-26",
        phoneNumber: "+9988771122",
        assignedTo: "Sophia Brown",
        taskType: "Design",
        supplier: "Design Studio",
        costPrice: 900,
        sellingPrice: 1500,
        payment: 1100,
        netProfit: 400,
        status: "Completed"
    },
    {
        taskId: 7,
        client: "Maria Garcia",
        dateCreated: "2024-05-25",
        phoneNumber: "+1122334455",
        assignedTo: "David Johnson",
        taskType: "Maintenance",
        supplier: "Maintenance Services",
        costPrice: 600,
        sellingPrice: 900,
        payment: 700,
        netProfit: 300,
        status: "In Progress"
    },
    {
        taskId: 8,
        client: "Yuki Tanaka",
        dateCreated: "2024-05-24",
        phoneNumber: "+3344556677",
        assignedTo: "Hannah Taylor",
        taskType: "Consultation",
        supplier: "Consulting Associates",
        costPrice: 750,
        sellingPrice: 1100,
        payment: 900,
        netProfit: 350,
        status: "Completed"
    },
    {
        taskId: 9,
        client: "Kim Jong",
        dateCreated: "2024-05-23",
        phoneNumber: "+1122334455",
        assignedTo: "Park Soo",
        taskType: "Development",
        supplier: "Software Solutions",
        costPrice: 1100,
        sellingPrice: 1600,
        payment: 1300,
        netProfit: 500,
        status: "Pending"
    },
    {
        taskId: 10,
        client: "Ahmed Ali",
        dateCreated: "2024-05-22",
        phoneNumber: "+9988776655",
        assignedTo: "Fatima Khan",
        taskType: "Training",
        supplier: "Training Academy",
        costPrice: 850,
        sellingPrice: 1300,
        payment: 1000,
        netProfit: 450,
        status: "In Progress"
    },
    {
        taskId: 11,
        client: "Sophie Dupont",
        dateCreated: "2024-05-21",
        phoneNumber: "+3344556677",
        assignedTo: "Lucas Martinez",
        taskType: "Design",
        supplier: "Design Solutions",
        costPrice: 950,
        sellingPrice: 1400,
        payment: 1100,
        netProfit: 450,
        status: "Completed"
    },
    {
        taskId: 12,
        client: "Ivan Petrov",
        dateCreated: "2024-05-20",
        phoneNumber: "+1122339988",
        assignedTo: "Elena Ivanova",
        taskType: "Maintenance",
        supplier: "Maintenance Company",
        costPrice: 700,
        sellingPrice: 1000,
        payment: 800,
        netProfit: 300,
        status: "In Progress"
    },
    {
        taskId: 13,
        client: "Chen Wei",
        dateCreated: "2024-05-19",
        phoneNumber: "+1234567890",
        assignedTo: "Li Na",
        taskType: "Consultation",
        supplier: "Consulting Services",
        costPrice: 800,
        sellingPrice: 1200,
        payment: 900,
        netProfit: 400,
        status: "Completed"
    },
    {
        taskId: 14,
        client: "Federico Russo",
        dateCreated: "2024-05-18",
        phoneNumber: "+9988771122",
        assignedTo: "Giulia Ferrari",
        taskType: "Development",
        supplier: "Tech Solutions",
        costPrice: 1300,
        sellingPrice: 1900,
        payment: 1500,
        netProfit: 600,
        status: "Pending"
    },
    {
        taskId: 15,
        client: "Alexandra Popescu",
        dateCreated: "2024-05-17",
        phoneNumber: "+9988776655",
        assignedTo: "Andrei Ionescu",
        taskType: "Training",
        supplier: "Training Academy",
        costPrice: 900,
        sellingPrice: 1400,
        payment: 1100,
        netProfit: 500,
        status: "In Progress"
    },
    {
        taskId: 16,
        client: "Javier López",
        dateCreated: "2024-05-16",
        phoneNumber: "+1122334455",
        assignedTo: "María García",
        taskType: "Design",
        supplier: "Design Studio",
        costPrice: 1000,
        sellingPrice: 1600,
        payment: 1200,
        netProfit: 600,
        status: "Completed"
    },
    {
        taskId: 17,
        client: "Emma Smith",
        dateCreated: "2024-05-15",
        phoneNumber: "+3344556677",
        assignedTo: "Jack Johnson",
        taskType: "Maintenance",
        supplier: "Maintenance Services",
        costPrice: 750,
        sellingPrice: 1100,
        payment: 900,
        netProfit: 350,
        status: "In Progress"
    },
    {
        taskId: 18,
        client: "Sofia Morales",
        dateCreated: "2024-05-14",
        phoneNumber: "+1122339988",
        assignedTo: "Carlos Rodríguez",
        taskType: "Consultation",
        supplier: "Consulting Firm",
        costPrice: 850,
        sellingPrice: 1300,
        payment: 1000,
        netProfit: 450,
        status: "Completed"
    },
    {
        taskId: 19,
        client: "Mohamed Ali",
        dateCreated: "2024-05-13",
        phoneNumber: "+1234567890",
        assignedTo: "Fatima Khan",
        taskType: "Development",
        supplier: "Software Solutions",
        costPrice: 1100,
        sellingPrice: 1600,
        payment: 1300,
        netProfit: 500,
        status: "Pending"
    },
    {
        taskId: 20,
        client: "Amelia Brown",
        dateCreated: "2024-05-12",
        phoneNumber: "+9988776655",
        assignedTo: "Michael Wilson",
        taskType: "Training",
        supplier: "Training Experts",
        costPrice: 800,
        sellingPrice: 1200,
        payment: 1000,
        netProfit: 400,
        status: "In Progress"
    }
];


  userArray: any[] = [];
  showShimmer: boolean = false;
  currentPage = 0;
  searchKey: string = '';
  
  @Input() showPaging: boolean = true;
  @Output() currentPageChoosen = new EventEmitter<number>();


  UsersArrayLength: number = 0;

  constructor(
    private apiService: GeneralService,
    private router: Router,
    private userService: UserService,
    private searchService: SearchService
  ) {

    effect(() => {
      this.searchKey = this.searchService.UserSearchKey();
      this.currentPage = 0;
      // this.fetchUsers(this.currentPage);
    });
  }
  ngOnInit(): void {
    this.UsersArrayLength = Math.ceil(this.taskData.length / this.apiService.PageSizing);
    this.searchKey = this.searchService.UserSearchKey();
    // this.fetchUsers(this.currentPage);
  }

  // FUNCTION TO FETCH USERS
  fetchUsers(currentPage: number): void {
    this.userService.GET_USERS(currentPage).subscribe({
      next: (response: any) => {
        this.userArray = response.my_Users.first;
        this.UsersArrayLength = Math.ceil(response.my_Users.second / this.apiService.PageSizing);
       
      },
      error: (error: any) => { this.showShimmer = false; console.error(error); },
      complete: () => { this.showShimmer = false; }
    });
  }

  //RECIEVE THE PAGE SIZE
  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.fetchUsers(this.currentPage)
  }

  // Function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number): void {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
