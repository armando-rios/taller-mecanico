import { Part } from "../../../types/inventory";
import SaleProduct from "./SaleProduct";

interface SaleCartProps {
  parts: Part[];
  setPartsList: React.Dispatch<React.SetStateAction<Part[]>>;
}

const SaleCart = ({ parts, setPartsList }: SaleCartProps) => {
  const minRows = 2;
  const emptyRowsNeeded = Math.max(0, minRows - parts.length);

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
      {/* Scrollable tbody */}
      <div className="max-h-[89px] overflow-y-auto">
        <table className="w-full text-sm">
          <tbody>
            {parts.map((part) => (
              <SaleProduct
                key={part._id}
                part={part}
                setPartsList={setPartsList}
              />
            ))}
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
