export class Package {
  constructor(
    public _id: string  = '',
    public name: string = '',
    public source: string ='',
    public destination: string = '',
    public duration: number = 0,
    public hotels: string = '',
    public numberOfPeople: number = 0,
    public price: number = 0, //this is cost
    public sell: number =0,
    public netprofit: number = 0,
    public note: string = '',
    public status: string = '',
  ) {}
}
