import { useEffect, useState } from "react";
import { Part } from "../../../types/invetory";

interface SaleProductProps {
  part: Part;
  setPartsList: React.Dispatch<React.SetStateAction<Part[]>>;
}

const SaleProduct = ({ part, setPartsList }: SaleProductProps) => {
  const [cuantity, setCuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const handleRemovePart = (part: Part) => {
    setPartsList((prevParts) => prevParts.filter((p) => p._id !== part._id));
  };

  useEffect(() => {
    setTotal(cuantity * part.price);
  }, [cuantity, part.price]);

  return (
    <tr className="border-b border-neutral-600">
      <td className="p-2">{part.name}</td>
      <td className="p-2">
        <input
          type="number"
          value={cuantity}
          min="1"
          className="w-12 bg-neutral-600 rounded p-1"
          onChange={(e) => setCuantity(parseInt(e.target.value))}
        />
      </td>
      <td className="p-2">${part.price}</td>
      <td className="p-2">${total}</td>
      <td className="p-2">
        <button
          className="text-red-500 hover:text-red-400"
          onClick={() => handleRemovePart(part)}
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

export default SaleProduct;
