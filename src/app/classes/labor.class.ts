export class LaborList {
    constructor(
      public _id: string = '',
      public name: string ='',
      public nationality: string ='',
      public gender: string ='',
      public type: string ='',
      public age: number=0,
      public cost : number =0,
      public note: string ='',
      public sell : number =0,
      public status: string =''
    ) {}
  }