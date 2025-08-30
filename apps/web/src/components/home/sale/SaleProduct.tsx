import { CartItem } from "../../../types/sale";

interface SaleProductProps {
  cartItem: CartItem;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const SaleProduct = ({ cartItem, setCartItems }: SaleProductProps) => {
  // ========== NUEVA FUNCIÓN PARA ACTUALIZAR CANTIDAD ==========
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; // No permitir cantidad menor a 1

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.part._id === cartItem.part._id
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };
  // ===========================================================

  // ========== NUEVA FUNCIÓN PARA REMOVER ==========
  const handleRemovePart = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.part._id !== cartItem.part._id),
    );
  };
  // ===============================================

  const total = cartItem.quantity * cartItem.part.price; // ← MODIFICADO

  return (
    <tr className="border-b border-neutral-600">
      <td className="p-2">{cartItem.part.name}</td>
      <td className="p-2">
        <input
          type="number"
          value={cartItem.quantity} // ← MODIFICADO
          min="1"
          max={cartItem.part.stock} // ← NUEVO: limitar por stock
          className="w-12 bg-neutral-600 rounded p-1"
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} // ← MODIFICADO
        />
      </td>
      <td className="p-2">${cartItem.part.price.toFixed(2)}</td>
      <td className="p-2">${total.toFixed(2)}</td>
      <td className="p-2">
        <button
          className="text-red-500 hover:text-red-400"
          onClick={handleRemovePart} // ← MODIFICADO
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

export default SaleProduct;
