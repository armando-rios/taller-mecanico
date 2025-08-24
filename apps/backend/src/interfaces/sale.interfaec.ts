import { ObjectId } from 'mongoose';

export interface ISaleItem {
  part: ObjectId;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ISale extends Document {
  client: ObjectId;
  seller: ObjectId;
  items: ISaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'other';
  status: 'pending' | 'completed' | 'canceled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
