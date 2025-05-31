import { useState } from "react";
import { Part } from "../../../types/invetory";
import Product from "./Product";
import SaleCart from "./SaleCart";
import Search from "../../Search";

const CreateSale = ({ parts }: { parts: Part[] }) => {
  const [filteredParts, setFilteredParts] = useState(parts);
  const [partsList, setPartsList] = useState<Part[]>([]);

  const searchPart = (part: Part, searchTerm: string) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code?.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="p-4 md:w-2/3 border-r border-neutral-700">
      <div className="flex mb-4">
        <Search
          data={parts}
          setFilteredData={setFilteredParts}
          searchFn={searchPart}
          placeholder="Buscar producto..."
        />
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
  );
};

export default CreateSale;
