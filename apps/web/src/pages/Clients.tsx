import Search from "../components/Search";
import { Client } from "../types/client";
import DeleteButton from "../components/shared/DeleteButton";
import ClientDetailsModal from "../components/clients/ClientDetailsModal";
import useClients from "../hooks/clients/useClients";

const Clients = () => {
  const {
    clients,
    filteredClients,
    setFilteredClients,
    handleDelete,
    handleViewDetails,
    selectedClient,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    searchClient,
  } = useClients();

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
                <th className="p-3 text-left">Teléfono</th>
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
                    <td className="p-3">{client.email}</td>
                    <td className="p-3">{client.phone}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleViewDetails(client)}
                      >
                        Ver Detalles
                      </button>
                      <button className="text-orange-700 hover:underline">
                        Editar
                      </button>
                      <DeleteButton
                        id={client._id}
                        endpoint={"clients"}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      {isDetailsModalOpen && selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          setIsModalOpen={setIsDetailsModalOpen}
        />
      )}
    </div>
  );
};

export default Clients;
