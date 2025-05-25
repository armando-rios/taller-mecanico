import { useState, useEffect } from "react";
import Search from "../components/Search";
import { Client } from "../types/client";
import api from "../config/axios";

const searchClient = (client: Client, searchTerm: string) => {
  return (
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <div className="flex-1 overflow-y-auto rounded-lg">
          <table className="w-full bg-neutral-700 rounded-lg overflow-hidden">
            <thead className="bg-neutral-600 sticky top-0">
              <tr>
                <th className="p-3 text-left">CI</th>
                <th className="p-3 text-left">Nombres</th>
                <th className="p-3 text-left">Apellidos</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client: Client) => {
                return (
                  <tr
                    className="border-t border-gray-700 hover:bg-gray-700"
                    key={client._id}
                  >
                    <td className="p-3 w-1/6">{client.ci}</td>
                    <td className="p-3">{client.firstName}</td>
                    <td className="p-3">{client.lastName}</td>
                    <td className="p-3 flex space-x-2">
                      <button className="text-orange-700 hover:underline">
                        Editar
                      </button>
                      <button className="text-red-500 hover:underline">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
