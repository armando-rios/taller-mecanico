import { useState, useEffect, useCallback } from "react";
import { Part } from "../../types/invetory";
import api from "../../config/axios";
import Close from "../../icons/Close";
import CreateClient from "./sale/CreateClient";
import CreateSale from "./sale/CreateSale";
import { Client } from "../../types/client";
import SaleSummary from "./sale/SaleSummary";

const MakeSaleModal = ({
  parts,
  setIsModalOpen,
}: {
  parts: Part[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Unifica el estado de pestañas
  const [activeTab, setActiveTab] = useState<"sale" | "client">("sale");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom hook-like para obtener clientes
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/clients");
      setClients(data);
    } catch (error) {
      setError("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Cierre del modal con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsModalOpen]);

  // Cierre al hacer click fuera del modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-5xl">
        <div className="flex justify-between border-b border-neutral-700">
          <div className="flex">
            <button
              className={`px-4 py-4 border-b-2 ${
                activeTab === "sale"
                  ? "text-orange-700 border-orange-700"
                  : "text-neutral-400 hover:text-white border-transparent"
              }`}
              onClick={() => setActiveTab("sale")}
              aria-selected={activeTab === "sale"}
              aria-controls="sale-tab"
            >
              Nueva Venta
            </button>
            <button
              className={`px-4 py-4 border-b-2 ${
                activeTab === "client"
                  ? "text-orange-700 border-orange-700"
                  : "text-neutral-400 hover:text-white border-transparent"
              }`}
              onClick={() => setActiveTab("client")}
              aria-selected={activeTab === "client"}
              aria-controls="client-tab"
            >
              Cliente
            </button>
          </div>
          <button
            className="text-gray-400 hover:text-white m-4 font-bold"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cerrar modal"
          >
            <Close />
          </button>
        </div>
        {loading && <div className="p-4 text-center">Cargando clientes...</div>}
        {error && <div className="p-4 text-red-500">{error}</div>}

        <div className="flex md:flex-row items-center">
          {activeTab === "client" && <CreateClient clients={clients} />}
          {activeTab === "sale" && <CreateSale parts={parts} />}
          <SaleSummary />
        </div>
      </div>
    </div>
  );
};

export default MakeSaleModal;
