import { useState } from "react";
import Input from "../../inventory/Input";
import { Client } from "../../../types/client";
import Search from "../../Search";

interface Props {
  clients: Client[];
}

const CreateClient = ({ clients }: Props) => {
  const [ci, setCi] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otherContact, setOtherContact] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);

  const searchClient = (client: Client, searchTerm: string) => {
    return (
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {filteredClients.map((client) => (
          <div className="flex justify-between items-center px-4 py-2 bg-neutral-700 rounded-lg text-sm font-medium">
            <div>
              <h3>{client.firstName + " " + client.lastName}</h3>
              <p>CI: {client.ci}</p>
            </div>
            <button className="bg-orange-700 w-8 h-8 rounded-lg">+</button>
          </div>
        ))}
      </div>
      <form className="grid grid-cols-2 gap-4" typeof="submit">
        <Input title="Numero de Cedula" value={ci} setValue={setCi} />
        <Input
          title="Primer Nombre"
          value={firstName}
          setValue={setFirstName}
        />
        <Input
          title="Primer Apellido"
          value={lastName}
          setValue={setLastName}
        />
        <Input title="Numero de Telefono" value={phone} setValue={setPhone} />
        <Input title="Correo Electronico" value={email} setValue={setEmail} />
        <Input
          title="Otro contacto"
          value={otherContact}
          setValue={setOtherContact}
        />
        <button
          className="col-span-2 bg-orange-700 px-4 py-2 rounded-lg"
          type="submit"
        >
          Guardar y Usar
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
