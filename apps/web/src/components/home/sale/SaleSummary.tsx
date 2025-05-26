const SaleSummary = () => {
  return (
    <div className="p-4 md:w-1/3">
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

      <button className="w-full bg-orange-700 py-3 rounded-lg font-medium hover:bg-orange-800 transition">
        Finalizar Venta
      </button>
    </div>
  );
};

export default SaleSummary;
