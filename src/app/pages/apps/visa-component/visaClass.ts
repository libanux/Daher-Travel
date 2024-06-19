export class VisaClass {
    constructor(
      public _id: number = 0,
      public name: string = '',
      public country: string = '',
      public note: string = '',
      public sell: number = 0,
      public status: string = '',
      public type: string = '',
      public createdAt: string = '',
      public updatedAt: string = '',

    ) {}
  }

  export const Visa_Status_Array: any [] = [
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
