export class Tickets {
  constructor(
    public _id: string = '',
    public name: string = '',
    public source: string = '',
    public destination: string = '',
    public seats: number = 0,
    public duration: number = 0,
    public price: number = 0,
    public sell: number = 0,
    public note: string = '',
    public status: string ="",
  ) {}
}
