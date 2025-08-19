import { useState } from "react";
import Input from "../../inventory/Input";
import { Client } from "../../../types/client";
import Search from "../../Search";
import api from "../../../config/axios";

interface Props {
  clients: Client[];
  onClientCreated: (client: Client) => void;
}

const CreateClient = ({ clients, onClientCreated }: Props) => {
  const [ci, setCi] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otherContact, setOtherContact] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const searchClient = (client: Client, searchTerm: string) => {
    return (
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const resetForm = () => {
    setCi("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setOtherContact("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ci || !firstName || !lastName || !phone) {
      setError("Por favor completa los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { data } = await api.post<Client>("/clients", {
        ci,
        firstName,
        lastName,
        phone,
        email,
        otherContact,
      });

      onClientCreated(data);
      setFilteredClients((prev) => [...prev, data]);
      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      if (error) {
        setError("Error al crear el cliente. Intenta nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 gap-4 md:w-2/3 border-r border-neutral-700">
      <div className="flex mb-4">
        <Search
          data={clients}
          setFilteredData={setFilteredClients}
          searchFn={searchClient}
          placeholder="Buscar cliente..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 max-h-[102px] overflow-y-auto">
        {filteredClients.map((client) => (
          <div
            key={client.ci}
            className="flex justify-between items-center px-4 py-2 bg-neutral-700 rounded-lg text-sm font-medium"
          >
            <div>
              <h3>{client.firstName + " " + client.lastName}</h3>
              <p>CI: {client.ci}</p>
            </div>
            <button className="bg-orange-700 w-8 h-8 rounded-lg">+</button>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm">
          ¡Cliente creado exitosamente!
        </div>
      )}

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <Input title="Numero de Cedula *" value={ci} setValue={setCi} />
        <Input
          title="Primer Nombre *"
          value={firstName}
          setValue={setFirstName}
        />
        <Input
          title="Primer Apellido *"
          value={lastName}
          setValue={setLastName}
        />
        <Input title="Numero de Telefono *" value={phone} setValue={setPhone} />
        <Input title="Correo Electronico" value={email} setValue={setEmail} />
        <Input
          title="Otro contacto"
          value={otherContact}
          setValue={setOtherContact}
        />
        <button
          type="submit"
          className="col-span-2 bg-orange-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar y Usar"}
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
