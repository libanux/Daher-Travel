export class GeneralFinance {
    constructor(
      public customer: {
        id: string;
        name: string;
        phoneNumber:string
      } =
      { id: '', name: '', phoneNumber: '' },
      public description: string = '',
      public cost: string ="",
      public sell: string =''
    ) {}
  }
 