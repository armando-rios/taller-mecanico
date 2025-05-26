import { ChangeEvent, useState } from "react";
import { Part } from "../../../types/invetory";
import Product from "./Product";
import SaleCart from "./SaleCart";
import SaleSummary from "./SaleSummary";

const CreateSale = ({ parts }: { parts: Part[] }) => {
  const [filter, setFilter] = useState("");
  const [filteredParts, setFilteredParts] = useState(parts);
  const [partsList, setPartsList] = useState<Part[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    const filtered = parts.filter((part) =>
      part.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredParts(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 md:w-2/3 border-r border-neutral-700">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="flex-grow bg-neutral-700 rounded-l-lg p-2"
            value={filter}
            onChange={handleChange}
          />
          <button className="bg-orange-700 px-4 rounded-r-lg">Buscar</button>
        </div>

        <div className="h-64 overflow-y-auto mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredParts.map((part: Part) => (
              <Product key={part._id} data={part} setPartsList={setPartsList} />
            ))}
          </div>
        </div>

        <h4 className="font-medium mb-2">Productos en la venta</h4>
        <SaleCart parts={partsList} setPartsList={setPartsList} />
      </div>
      <SaleSummary />
    </div>
  );
};

export default CreateSale;
