import { Client } from "../../../types/client";

interface SaleSummaryProps {
  selectedClient: Client | null;
  onRemoveClient: () => void;
}

const SaleSummary = ({ selectedClient, onRemoveClient }: SaleSummaryProps) => {
  return (
    <div className="p-4 md:w-1/3">
      {/* NUEVA SECCIÓN: Cliente Seleccionado */}
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
              className="bg-orange-700 w-8 h-8 rounded-lg text-white hover:bg-orange-600 text-sm"
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

      {/* MANTENER TODO EL CÓDIGO ORIGINAL EXISTENTE */}
      <div className="bg-neutral-700 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-orange-700 mb-3">Resumen de Venta</h4>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>$12.99</span>
          </div>
          <div className="flex justify-between">
            <span>Descuento:</span>
            <input
              type="number"
              value="0"
              min="0"
              className="w-16 bg-neutral-600 rounded p-1 text-right"
            />
          </div>
          <div className="flex justify-between font-medium border-t border-neutral-600 pt-2 mt-2">
            <span>Total:</span>
            <span>$12.99</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Método de Pago</label>
          <select className="w-full bg-neutral-600 rounded p-2">
            <option>Efectivo</option>
            <option>Tarjeta de Crédito</option>
            <option>Transferencia</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm">Notas (opcional)</label>
          <textarea className="w-full bg-neutral-600 rounded p-2"></textarea>
        </div>
      </div>

      {/* SOLO AGREGAR disabled AL BOTÓN EXISTENTE */}
      <button
        className="w-full bg-orange-700 py-3 rounded-lg font-medium hover:bg-orange-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedClient}
      >
        Finalizar Venta
      </button>
    </div>
  );
};

export default SaleSummary;
