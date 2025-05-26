import { useState } from "react";
import { Part } from "../../types/invetory";
import Close from "../../icons/Close";
import CreateClient from "./sale/CreateClient";
import CreateSale from "./sale/CreateSale";

const MakeSaleModal = ({
  parts,
  setIsModalOpen,
}: {
  parts: Part[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [clientForm, setClientForm] = useState(false);
  const [saleForm, setSaleForm] = useState(true);

  const changeToClient = () => {
    setClientForm(true);
    setSaleForm(false);
  };

  const changeToSale = () => {
    setClientForm(false);
    setSaleForm(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between border-b border-neutral-700">
          <div className="flex">
            <button
              className="px-4 py-4 text-orange-700 border-b-2 border-orange-700"
              onClick={changeToSale}
            >
              Nueva Venta
            </button>
            <button
              className="px-4 py-4 text-neutral-400 hover:text-white"
              onClick={changeToClient}
            >
              Cliente
            </button>
          </div>
          <button
            className="text-gray-400 hover:text-white m-4 font-bold"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <Close />
          </button>
        </div>
        {clientForm && <CreateClient />}
        {saleForm && <CreateSale parts={parts} />}
      </div>
    </div>
  );
};

export default MakeSaleModal;
