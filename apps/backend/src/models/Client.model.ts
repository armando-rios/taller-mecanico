import { Schema, model } from 'mongoose';
import { IClient } from '../interfaces/client.interface';

const clientSchema = new Schema<IClient>(
  {
    ci: {
      type: String,
      required: [true, 'Por favor ingrese un CI'],
    },
    firstName: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
    },
    lastName: {
      type: String,
      required: [true, 'Por favor ingrese un apellido'],
    },
    email: {
      type: String,
      required: [false, 'Por favor ingrese un correo'],
    },
    phone: {
      type: String,
      required: [true, 'Por favor ingrese un telefono'],
    },
  },
  {
    timestamps: true,
  },
);

const Client = model<IClient>('Client', clientSchema);

export default Client;
