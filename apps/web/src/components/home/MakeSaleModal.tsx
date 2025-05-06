import Product from "./Product";
import SaleCart from "./SaleCart";

const MakeSaleModal = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="border-b border-neutral-700">
          <div className="flex">
            <button className="px-4 py-4 text-orange-700 border-b-2 border-orange-700">
              Nueva Venta
            </button>
            <button className="px-4 py-4 text-neutral-400 hover:text-white">
              Cliente
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="p-4 md:w-2/3 border-r border-neutral-700">
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Buscar producto..."
                className="flex-grow bg-neutral-700 rounded-l-lg p-2"
              />
              <button className="bg-orange-700 px-4 rounded-r-lg">
                Buscar
              </button>
            </div>

            <div className="h-64 overflow-y-auto mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Product />
              </div>
            </div>

            <h4 className="font-medium mb-2">Productos en la venta</h4>
            <SaleCart />
          </div>
          <div className="p-4 md:w-1/3">
            <div className="bg-neutral-700 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-orange-700 mb-3">
                Resumen de Venta
              </h4>

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
        </div>
      </div>
    </div>
  );
};

export default MakeSaleModal;
