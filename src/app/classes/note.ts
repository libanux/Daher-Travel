export class Note {
  constructor(
    public _id: string = '',
    public adminid: string ="",
    public title: string = '',
    public text: string = '',
    public status: string ="",
    public createdAt: string =''
  ) {}
}
