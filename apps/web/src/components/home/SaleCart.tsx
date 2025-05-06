const SaleCart = () => {
  return (
    <div className="bg-neutral-700 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-600">
          <tr>
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-left">Cant.</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-600">
            <td className="p-2">Filtro de Aceite</td>
            <td className="p-2">
              <input
                type="number"
                value="1"
                min="1"
                className="w-12 bg-neutral-600 rounded p-1"
              />
            </td>
            <td className="p-2">$12.99</td>
            <td className="p-2">$12.99</td>
            <td className="p-2">
              <button className="text-red-500 hover:text-red-400">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SaleCart;
