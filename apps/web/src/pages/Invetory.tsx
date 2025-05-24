import { useState, useEffect } from "react";
import api from "../config/axios";
import Modal from "../components/inventory/Modal";
import { Part, Category } from "../types/invetory";
import Search from "../components/Search";

const Invetory = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParts = async () => {
    try {
      const { data } = await api.get("/parts");
      fetchCategories();
      setParts(data);
      setFilteredParts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchParts();
    setFilteredParts(parts);
  }, []);

  const searchPart = (part: Part, searchTerm: string) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <>
      <div className="p-4 bg-neutral-800 rounded-lg gap-4 flex flex-col flex-1 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Inventario</h2>
          <button
            className="py-2 px-4 bg-orange-700 rounded-lg font-semibold border-2 border-orange-700 hover:border-white"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Registrar Producto
          </button>
        </div>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} fetchParts={fetchParts} />
        )}
        <Search
          data={parts}
          setFilteredData={setFilteredParts}
          searchFn={searchPart}
          placeholder="Buscar..."
        />
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto rounded-lg">
            <table className="w-full bg-neutral-700 rounded-lg overflow-hidden">
              <thead className="bg-neutral-600 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Código</th>
                  <th className="p-3 text-left">Producto</th>
                  <th className="p-3 text-left">Categoría</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Precio</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((part: Part) => {
                  return (
                    <tr
                      className="border-t border-gray-700 hover:bg-gray-700"
                      key={part._id}
                    >
                      <td className="p-3 w-1/6">{part.code}</td>
                      <td className="p-3">{part.name}</td>
                      <td className="p-3">
                        {
                          categories.find(
                            (category: Category) =>
                              category._id === part.category,
                          )?.name
                        }
                      </td>
                      <td className="p-3">{part.stock}</td>
                      <td className="p-3">{part.price}</td>
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
    </>
  );
};

export default Invetory;
