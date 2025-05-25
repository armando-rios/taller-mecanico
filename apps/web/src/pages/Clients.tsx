import { useState, useEffect } from "react";
import Search from "../components/Search";
import { Client } from "../types/client";
import api from "../config/axios";

const searchClient = (client: Client, searchTerm: string) => {
  return (
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

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
    setFilteredClients(clients);
  }, []);

  return (
    <div className="p-3 bg-neutral-800 rounded-lg gap-4 flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clientes</h2>
      </div>
      <Search
        data={clients}
        setFilteredData={setFilteredClients}
        searchFn={searchClient}
      />
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto rounded-lg"></div>
      </div>
    </div>
  );
};

export default Clients;
