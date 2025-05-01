import mongoose, { Schema, model } from 'mongoose';
import { IPart } from '../interfaces/part.interface';

const partSchema = new Schema<IPart>(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
    },
    code: {
      type: String,
      required: [true, 'Por favor ingrese un codigo'],
    },
    brand: {
      type: String,
      required: [true, 'Por favor ingrese una marca'],
    },
    itemModel: {
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Por favor ingrese una categoria'],
    },
    provider: {
      type: String,
      required: [false, 'Por favor ingrese un proveedor'],
    },
    location: {
      type: String,
      required: [false, 'Por favor ingrese una ubicacion'],
    },
    description: {
      type: String,
      required: [false, 'Por favor ingrese una descripcion'],
    },
  },
  {
    timestamps: true,
  },
);

const Part = model<IPart>('Parts', partSchema);

export default Part;
