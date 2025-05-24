import { useState } from "react";
import Search from "../components/Search";
import { Client } from "../types/client";

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
