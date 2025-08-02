import { Part } from "../../../types/inventory";

interface ProductProps {
  data: Part;
  setPartsList: React.Dispatch<React.SetStateAction<Part[]>>;
}

const Product = ({ data, setPartsList }: ProductProps) => {
  const handleAddToCart = () => {
    setPartsList((prevParts) => {
      const existingPartIndex = prevParts.findIndex((p) => p._id === data._id);

      if (existingPartIndex >= 0) {
        return prevParts.map((part, index) =>
          index === existingPartIndex ? { ...part } : part,
        );
      } else {
        return [...prevParts, { ...data }];
      }
    });
  };

  return (
    <div
      className="bg-neutral-700 p-3 rounded-lg hover:bg-neutral-600 cursor-pointer"
      onClick={handleAddToCart}
    >
      <div className="flex justify-between">
        <span className="font-medium">{data.name}</span>
        <span className="text-orange-700">${data.price}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Cód: {data.code} | Stock: {data.stock}
      </div>
    </div>
  );
};

export default Product;
