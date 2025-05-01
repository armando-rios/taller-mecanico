import { Document } from 'mongoose';

export interface IPart extends Document {
  code: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  stock: number;
  location: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}
