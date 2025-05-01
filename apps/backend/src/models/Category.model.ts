import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
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

const Category = model<ICategory>('Category', categorySchema);

export default Category;
