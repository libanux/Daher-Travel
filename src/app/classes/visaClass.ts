export class VisaClass {
    constructor(
      public _id: string = '',
      public name: string = '',
      public country: string = '',
      public note: string = '',
      public sell: string = '',
      public status: string = '',
      public type: string = '',
      public Created: string = '',
      public updatedAt: string = '',
    ) {}
  }

  export const Visa_Status_Array: any [] = [
    { value: 'rejected', viewValue: 'Rejected' },
    { value: 'approved', viewValue: 'Approved' },
    { value: 'pending', viewValue: 'Pending' },
  ];

  export const Visa_Status_Array_FILTERATION: any [] = [
    { value: 'all', viewValue: 'All' },
    { value: 'rejected', viewValue: 'Rejected' },
    { value: 'approved', viewValue: 'Approved' },
    { value: 'pending', viewValue: 'Pending' },
  ];

  export const VisaType_Array: any [] = [
    { value: 'Tourist', viewValue: 'Tourist' },
    { value: 'Work', viewValue: 'Work' },
    { value: 'Student', viewValue: 'Student' },
    { value: 'Other', viewValue: 'Other' },
  ];

  export const VisaColumns: any[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'country', viewValue: 'Country' },
    { value: 'type', viewValue: 'Type' },
    { value: 'sell', viewValue: 'Sell' },
    { value: 'note', viewValue: 'Note' },
    { value: 'status', viewValue: 'Status' },
    { value: 'createdAt', viewValue: 'Create Date' },
    { value: 'action', viewValue: 'Action' },
  ];
  