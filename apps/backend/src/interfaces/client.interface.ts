import { Document } from 'mongoose';

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  ci: string;
  email: string;
  phone: string;
}
