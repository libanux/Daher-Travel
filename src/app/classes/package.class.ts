export class Package {
  constructor(
    public _id: string = '',
    public customer: {
      id: string;
      name: string;

    } =
    { id: '', name: '' },
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
