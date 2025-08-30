import { Part } from "../../../types/inventory";
import { CartItem } from "../../../types/sale";

interface ProductProps {
  data: Part;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Product = ({ data, cartItems, setCartItems }: ProductProps) => {
  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.part._id === data._id);
    if (existingItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.part._id === data._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      setCartItems((prevItems) => [...prevItems, { part: data, quantity: 1 }]);
    }
  };

  return (
    <div className="bg-neutral-700 p-3 rounded-lg hover:bg-neutral-600 transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h5 className="font-medium">{data.name}</h5>
          <p className="text-xs text-neutral-400">{data.code}</p>
        </div>
        <span className="text-orange-700 font-medium">${data.price}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-neutral-400">Stock: {data.stock}</span>
        <button
          className="bg-orange-700 px-3 py-1 rounded text-sm hover:bg-orange-600
transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddToCart}
          disabled={data.stock === 0}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Product;
