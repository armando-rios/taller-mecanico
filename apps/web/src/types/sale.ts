import { Part } from "./inventory";

export interface CartItem {
  part: Part;
  quantity: number;
}

export type PaymentMethod = "cash" | "credit_card" | "bank_transfer" | "other";

export interface SaleRequest {
  clientId: string;
  items: {
    part: string;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  discount?: number;
  notes?: string;
}
