export class Tickets {
  constructor(
    public _id: string = '',
    public name: string = '',
    public wholesaler: {
      id: string,
      name: string
    } = { id: '', name: '' },
    public source: string = '',
    public destination: string = '',
    public note: string = '',
    public cost: number = 0,
    public seats: number = 0,
    public credit: number = 0,
    public balance: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { }
}
