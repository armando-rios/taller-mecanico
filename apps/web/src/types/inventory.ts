export interface Part {
  _id: string;
  name: string;
  code: string;
  description: string;
  brand: string;
  itemModel: string;
  price: number;
  category: string;
  stock: number;
  provider: string;
}

export interface Category {
  _id: string;
  name: string;
}
