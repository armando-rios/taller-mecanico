import { model, Schema } from 'mongoose';
import { ISale } from '../interfaces/sale.interfaec';

const saleSchema = new Schema<ISale>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Clients',
      required: [true, 'Por favor ingrese un cliente'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Por favor ingrese un vendedor'],
    },
    items: [
      {
        part: {
          type: Schema.Types.ObjectId,
          ref: 'Parts',
          required: [true, 'Por favor ingrese una parte'],
        },
        quantity: {
          type: Number,
          required: [true, 'Por favor ingrese una cantidad'],
        },
        unitPrice: {
          type: Number,
          required: [true, 'Por favor ingrese un precio unitario'],
        },
        subtotal: {
          type: Number,
          required: [true, 'Por favor ingrese un subtotal'],
        },
      },
    ],
    subtotal: {
      type: Number,
      required: [true, 'Por favor ingrese un subtotal'],
    },
    tax: {
      type: Number,
      required: [true, 'Por favor ingrese un impuesto'],
    },
    discount: {
      type: Number,
      required: [true, 'Por favor ingrese un descuento'],
    },
    total: {
      type: Number,
      required: [true, 'Por favor ingrese un total'],
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'credit_card', 'debit_card', 'other'],
      required: [true, 'Por favor ingrese un metodo de pago'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
      required: [true, 'Por favor ingrese un estado'],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Sale = model<ISale>('Sales', saleSchema);

export default Sale;
