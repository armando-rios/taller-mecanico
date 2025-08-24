import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import Sale from '../models/Sale.model';
import Part from '../models/Part.model';
import { ISaleItem } from '../interfaces/sale.interface';
import { IPart } from '../interfaces/part.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const createSale = async (req: RequestWithUser, res: Response) => {
  try {
    const { clientId, items, paymentMethod, discount = 0 } = req.body;

    // 1. Buscar las partes en la BD para obtener los precios REALES
    const parts: IPart[] = await Part.find({
      _id: { $in: items.map((i: ISaleItem) => i.part) },
    });

    // 2. VALIDAR STOCK ANTES de continuar
    for (const item of items) {
      const part = parts.find((p) => p._id.toString() === item.part.toString());
      if (!part) {
        throw new Error(`Part with ID ${item.part} not found`);
      }

      // ✅ VALIDACIÓN DE STOCK
      if (part.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para ${part.name}. ` +
            `Disponible: ${part.stock}, Solicitado: ${item.quantity}`,
        );
      }
    }

    // 3. Calcular totales en el BACKEND (no confiar en el frontend)
    let subtotal = 0;
    const saleItems = items.map((item: ISaleItem) => {
      const part = parts.find((p) => p._id.toString() === item.part.toString());
      if (!part) {
        throw new Error(`Part with ID ${item.part} not found`);
      }
      const itemSubtotal = part.price * item.quantity; // Precio REAL de la BD
      subtotal += itemSubtotal;

      return {
        part: part._id,
        quantity: item.quantity,
        unitPrice: part.price, // ✅ Precio del backend
        subtotal: itemSubtotal,
      };
    });

    const tax = subtotal * 0.13;
    const total = subtotal + tax - discount;

    // 4. Crear la venta con valores calculados por el backend
    const sale = await Sale.create({
      client: clientId,
      seller: req.user?._id,
      items: saleItems,
      subtotal,
      tax,
      discount,
      total, // ✅ Total calculado en backend
      paymentMethod,
      status: 'completed',
    });

    // 5. ✅ REDUCIR EL STOCK de cada parte (operación atómica)
    for (const item of items) {
      await Part.findByIdAndUpdate(item.part, {
        $inc: { stock: -item.quantity }, // ← Decrementa el stock
      });
    }

    res.status(201).json(sale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error creating sale',
    });
  }
};
