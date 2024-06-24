export class Package {
  constructor(
    public _id: string = '',
    public customerId: string = '',
    public customerName: string = '',
    public phoneNumber: string = '',
    public source: string = '',
    public destination: string = '',
    public duration: number = 0,
    public hotels: string = '',
    public numberOfPeople: number = 0,
    public cost: number = 0,
    public sell: number = 0,
    public note: string = '',
    public status: string = '',
  ) { }
}
