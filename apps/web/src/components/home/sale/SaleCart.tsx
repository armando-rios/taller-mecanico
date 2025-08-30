import { CartItem } from "../../../types/sale";
import SaleProduct from "./SaleProduct";

interface SaleCartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const SaleCart = ({ cartItems, setCartItems }: SaleCartProps) => {
  const minRows = 2;
  const emptyRowsNeeded = Math.max(0, minRows - cartItems.length); // ← MODIFICADO

  return (
    <div className="bg-neutral-700 rounded-lg">
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
      </table>
      <div className="max-h-[89px] overflow-y-auto">
        <table className="w-full text-sm">
          <tbody>
            {cartItems.map(
              (
                item, // ← MODIFICADO
              ) => (
                <SaleProduct
                  key={item.part._id} // ← MODIFICADO
                  cartItem={item} // ← MODIFICADO
                  setCartItems={setCartItems} // ← MODIFICADO
                />
              ),
            )}
            {[...Array(emptyRowsNeeded)].map((_, index) => (
              <tr
                key={`empty-${index}`}
                className="border-b border-neutral-600"
              >
                <td
                  colSpan={5}
                  className="p-3 text-center text-neutral-400 italic"
                >
                  Vacío
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleCart;
