export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  ci: string;
  email: string;
  phone: string;
}

export interface Purchase {
  _id: string;
  date: string;
  total: number;
  items: {
    partName: string;
    quantity: number;
    price: number;
  }[];
}

export interface Service {
  _id: string;
  date: string;
  description: string;
  status: string;
  cost: number;
}
