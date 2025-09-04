import { useEffect, useState } from "react";
import useFetchClientData from "./useFetchClientData"; // Importamos el nuevo hook
import { Client, Purchase, Service } from "../../types/client";
import { formatCurrency, formatDate } from "../../utils/formatters";

interface ClientDetailsModalProps {
  client: Client;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useClientDetails = ({
  client,
  setIsModalOpen,
}: ClientDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "purchases" | "services">(
    "info",
  );

  const {
    data: purchases,
    loading: loadingPurchases,
    fetchData: fetchPurchases,
  } = useFetchClientData<Purchase>(client._id, "purchases", "purchases");

  const {
    data: services,
    loading: loadingServices,
    fetchData: fetchServices,
  } = useFetchClientData<Service>(client._id, "services", "services");

  useEffect(() => {
    if (activeTab === "purchases") {
      fetchPurchases();
    }
  }, [activeTab, fetchPurchases]);

  useEffect(() => {
    if (activeTab === "services") {
      fetchServices();
    }
  }, [activeTab, fetchServices]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsModalOpen]);

  return {
    activeTab,
    setActiveTab,
    purchases,
    services,
    loadingPurchases,
    loadingServices,
    handleBackdropClick,
    formatDate,
    formatCurrency,
  };
};

export default useClientDetails;
