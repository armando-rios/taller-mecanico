import { Client } from "../../../types/client";
import { CartItem, PaymentMethod } from "../../../types/sale";

interface SaleSummaryProps {
  selectedClient: Client | null;
  onRemoveClient: () => void;
  cartItems: CartItem[];
  discount: number;
  setDiscount: (value: number) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
  notes: string;
  setNotes: (value: string) => void;
  onFinalizeSale: () => void;
  isSaving: boolean;
}

const SaleSummary = ({
  selectedClient,
  onRemoveClient,
  cartItems,
  discount,
  setDiscount,
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
  onFinalizeSale,
  isSaving,
}: SaleSummaryProps) => {
  // ========== CÁLCULOS ==========
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.part.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.13; // 13% de impuesto
  const total = subtotal + tax - discount;
  return (
    <div className="p-4 md:w-1/3">
      {/* Cliente Seleccionado */}
      <div className="bg-neutral-700 p-4 rounded-lg mb-4">
        {selectedClient ? (
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-orange-700">
                {selectedClient.firstName} {selectedClient.lastName}
              </p>
              <p className="text-sm text-neutral-400">
                CI: {selectedClient.ci}
              </p>
            </div>
            <button
              type="button"
              onClick={onRemoveClient}
              className="bg-orange-700 w-8 h-8 rounded-lg text-white
hover:bg-orange-600 text-sm"
              title="Remover cliente"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-orange-700">Cliente</h4>
            <p className="text-neutral-400 text-sm italic">
              No hay cliente seleccionado
            </p>
          </div>
        )}
      </div>

      {/* Resumen de Venta */}
      <div className="bg-neutral-700 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-orange-700 mb-3">Resumen de Venta</h4>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span> {/* ← MODIFICADO */}
          </div>
          <div className="flex justify-between">
            <span>Impuesto (13%):</span> {/* ← NUEVO */}
            <span>${tax.toFixed(2)}</span> {/* ← NUEVO */}
          </div>
          <div className="flex justify-between">
            <span>Descuento:</span>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              min="0"
              max={subtotal + tax}
              step="0.01"
              className="w-20 bg-neutral-600 rounded p-1 text-right"
            />
          </div>
          <div
            className="flex justify-between font-medium border-t
border-neutral-600 pt-2 mt-2"
          >
            <span>Total:</span>
            <span className="text-orange-700 text-lg">
              ${total.toFixed(2)}
            </span>{" "}
            {/*
← MODIFICADO */}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Método de Pago</label>
          <select
            className="w-full bg-neutral-600 rounded p-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          >
            <option value="cash">Efectivo</option>
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="bank_transfer">Transferencia</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm">Notas (opcional)</label>
          <textarea
            className="w-full bg-neutral-600 rounded p-2 resize-none"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Agregar notas sobre la venta..."
          />
        </div>
      </div>

      {/* Botón Finalizar */}
      <button
        className="w-full bg-orange-700 py-3 rounded-lg font-medium
hover:bg-orange-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedClient || cartItems.length === 0 || isSaving}
        onClick={onFinalizeSale}
      >
        {isSaving ? "Procesando..." : "Finalizar Venta"} {/* ← MODIFICADO */}
      </button>

      {/* Mensaje de ayuda */}
      {!selectedClient && (
        <p className="text-xs text-neutral-400 text-center mt-2">
          Selecciona un cliente para continuar
        </p>
      )}
      {selectedClient && cartItems.length === 0 && (
        <p className="text-xs text-neutral-400 text-center mt-2">
          Agrega productos al carrito
        </p>
      )}
    </div>
  );
};

export default SaleSummary;
