export class LaborPdfData {
    constructor(
      public _id: string = '',
      public income: string ='',
      public expense: string ='',
      public netprofit: string ='',
      public otherincomes: string ='',
      public otherexpenses: string='',
      public Subtotal : string ='',
      public credit: string ='',
    ) {}
  }