import { Schema, model } from 'mongoose';
import { IPart } from '../interfaces/part.interface';

const partSchema = new Schema<IPart>(
  {
    code: {
      type: String,
      required: [true, 'Por favor ingrese un codigo'],
    },
    name: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
    },
    description: {
      type: String,
      required: [true, 'Por favor ingrese una descripcion'],
    },
    brand: {
      type: String,
      required: [true, 'Por favor ingrese una marca'],
    },
    model: {
      type: String,
      required: [true, 'Por favor ingrese un modelo'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor ingrese un precio'],
    },
    stock: {
      type: Number,
      required: [true, 'Por favor ingrese un stock'],
    },
    location: {
      type: String,
      required: [false, 'Por favor ingrese una ubicacion'],
    },
    provider: {
      type: String,
      required: [false, 'Por favor ingrese un proveedor'],
    },
    category: {
      type: String,
      required: [false, 'Por favor ingrese una categoria'],
    },
  },
  {
    timestamps: true,
  },
);

const Part = model('Parts', partSchema);

export default Part;
