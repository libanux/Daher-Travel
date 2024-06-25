export class Tickets {
  constructor(
    public _id: string = '',
    public name: string = '',
    public wholesaler: {
      id: string,
      name: string
    } = 
    { 
      id: '', name: '' },
    
    public source: string = '',
    public destination: string = '',
    public note: string = '',
    public cost: string = '',
    public seats: string = '',
    public credit: string = '',
    public balance: string = '',
    // public createdAt: Date = new Date(),
    // public updatedAt: Date = new Date()
  ) { }
}
