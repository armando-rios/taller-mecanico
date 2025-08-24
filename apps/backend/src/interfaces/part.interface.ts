import { Document, ObjectId } from 'mongoose';

export interface IPart extends Document {
  _id: ObjectId;
  code: string;
  name: string;
  description: string;
  brand: string;
  itemModel: string;
  price: number;
  category: ObjectId;
  stock: number;
  location: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}
