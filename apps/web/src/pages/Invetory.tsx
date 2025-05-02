import { useState, useEffect } from "react";
import api from "../config/axios";
import Modal from "../components/inventory/Modal";
import { Part, Category } from "../types/invetory";

const Invetory = () => {
  const [parts, setParts] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchParts();
  }, []);

  return (
    <>
      <div className="p-4 bg-neutral-800 rounded-lg gap-4 flex flex-col">
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
        <div className="overflow-x-auto">
          <table className="w-full bg-neutral-700 rounded-lg overflow-hidden">
            <thead className="bg-neutral-600">
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
              {parts.map((part: Part) => {
                return (
                  <tr
                    className="border-t border-gray-700 hover:bg-gray-700"
                    key={part._id}
                  >
                    <td className="p-3">{part.code}</td>
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
    </>
  );
};

export default Invetory;
