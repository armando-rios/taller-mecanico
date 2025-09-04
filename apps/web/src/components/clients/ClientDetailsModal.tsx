import { Client } from "../../types/client";
import Close from "../../icons/Close";
import useClientDetails from "../../hooks/clients/useClientDetails";

interface ClientDetailsModalProps {
  client: Client;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientDetailsModal = ({
  client,
  setIsModalOpen,
}: ClientDetailsModalProps) => {
  const {
    activeTab,
    setActiveTab,
    purchases,
    services,
    loadingPurchases,
    loadingServices,
    formatDate,
    formatCurrency,
    handleBackdropClick,
  } = useClientDetails({ client, setIsModalOpen });

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-neutral-700 p-4">
          <div>
            <h3 className="text-xl font-bold">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm text-neutral-400">CI: {client.ci}</p>
          </div>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cerrar modal"
          >
            <Close />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-700">
          <button
            className={`px-6 py-3 border-b-2 transition ${
              activeTab === "info"
                ? "text-orange-700 border-orange-700"
                : "text-neutral-400 hover:text-white border-transparent"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Información
          </button>
          <button
            className={`px-6 py-3 border-b-2 transition ${
              activeTab === "purchases"
                ? "text-orange-700 border-orange-700"
                : "text-neutral-400 hover:text-white border-transparent"
            }`}
            onClick={() => setActiveTab("purchases")}
          >
            Compras
          </button>
          <button
            className={`px-6 py-3 border-b-2 transition ${
              activeTab === "services"
                ? "text-orange-700 border-orange-700"
                : "text-neutral-400 hover:text-white border-transparent"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Servicios
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Info Tab */}
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <label className="text-sm text-neutral-400">Nombres</label>
                  <p className="text-lg">{client.firstName}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <label className="text-sm text-neutral-400">Apellidos</label>
                  <p className="text-lg">{client.lastName}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <label className="text-sm text-neutral-400">
                    Cédula de Identidad
                  </label>
                  <p className="text-lg">{client.ci}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <label className="text-sm text-neutral-400">Teléfono</label>
                  <p className="text-lg">{client.phone}</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg md:col-span-2">
                  <label className="text-sm text-neutral-400">
                    Correo Electrónico
                  </label>
                  <p className="text-lg">{client.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === "purchases" && (
            <div>
              {loadingPurchases ? (
                <div className="text-center py-8">
                  <p className="text-neutral-400">Cargando compras...</p>
                </div>
              ) : purchases.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-neutral-400">No hay compras registradas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase._id}
                      className="bg-neutral-700 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm text-neutral-400">
                            {formatDate(purchase.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-700">
                            {formatCurrency(purchase.total)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {purchase.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm bg-neutral-600 p-2 rounded"
                          >
                            <span>{item.partName}</span>
                            <span className="text-neutral-400">
                              {item.quantity} x {formatCurrency(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div>
              {loadingServices ? (
                <div className="text-center py-8">
                  <p className="text-neutral-400">Cargando servicios...</p>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-neutral-400">
                    No hay servicios registrados
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service._id}
                      className="bg-neutral-700 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-neutral-400">
                            {formatDate(service.date)}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                              service.status === "completed"
                                ? "bg-green-700"
                                : service.status === "pending"
                                  ? "bg-yellow-700"
                                  : "bg-red-700"
                            }`}
                          >
                            {service.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-700">
                            {formatCurrency(service.cost)}
                          </p>
                        </div>
                      </div>
                      <p className="text-neutral-300 mt-2">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-700 p-4 flex justify-end">
          <button
            className="px-4 py-2 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition"
            onClick={() => setIsModalOpen(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
