export class Product {
  constructor(
    public imageUrl: string,
    public name: string,
    public price: string,
    public date: Date,
    public id?: string
  ) { }
}

export class FbCreateResponse {
  constructor(
    public name: string
  ) { }
}