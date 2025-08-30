import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Client } from "../../types/client";

const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  // Estado para manejar el cliente seleccionado y el modal de detalles
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    const updatedClients = clients.filter((client) => client._id !== id);
    setClients(updatedClients);
    setFilteredClients(updatedClients);
  };

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/clients");
      setClients(data);
      setFilteredClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const searchClient = (client: Client, searchTerm: string) => {
    return (
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    clients,
    filteredClients,
    selectedClient,
    isDetailsModalOpen,
    handleDelete,
    handleViewDetails,
    fetchClients,
    setFilteredClients,
    setIsDetailsModalOpen,
    searchClient,
  };
};

export default useClients;
