import { Part } from "../../types/invetory";
import SaleProduct from "./SaleProduct";

interface SaleCartProps {
  parts: Part[];
  setPartsList: React.Dispatch<React.SetStateAction<Part[]>>;
}

const SaleCart = ({ parts, setPartsList }: SaleCartProps) => {
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
          {parts.map((part) => (
            <SaleProduct
              key={part._id}
              part={part}
              setPartsList={setPartsList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleCart;
