import { useState, useEffect } from "react";
import Input from "./Input";
import Close from "../../icons/Close";
import api from "../../config/axios";
import CategorySelector from "./CategorySelector";
import CreateCategoryModal from "./CreateCategoryModal";
import { Category } from "../../types/invetory";

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchParts: () => void;
}

const Modal = ({ setIsModalOpen, fetchParts }: ModalProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [itemModel, setItemModel] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    api.post("/parts", {
      name,
      code,
      description,
      brand,
      itemModel,
      price,
      category,
      stock,
      provider,
    });
    fetchParts();
    setIsModalOpen(false);
  };

  const handleCategoryCreated = async (categoryId: string) => {
    await fetchCategories();
    setCategory(categoryId);
    setIsCreatingCategory(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b border-neutral-700 p-4">
          <h3 className="text-xl font-semibold text-orange-700">
            Agregar Nuevo Producto
          </h3>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsModalOpen(false)}
          >
            <Close />
          </button>
        </div>

        <div className="p-6">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            typeof="submit"
          >
            <Input
              title="Nombre del Producto"
              value={name}
              setValue={setName}
            />
            <Input title="Codigo" value={code} setValue={setCode} />
            <Input title="Marca" value={brand} setValue={setBrand} />
            <Input title="Modelo" value={itemModel} setValue={setItemModel} />
            <Input
              title="Precio ($)"
              type="number"
              value={price}
              setValue={setPrice}
            />
            <Input
              title="Stock"
              type="number"
              value={stock}
              setValue={setStock}
            />

            <CategorySelector
              categories={categories}
              category={category}
              setCategory={setCategory}
              onCreateClick={() => setIsCreatingCategory(true)}
            />

            <Input title="Proveedor" value={provider} setValue={setProvider} />
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-700 border border-gray-600 rounded-lg p-2.5 outline-none"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="flex justify-end space-x-3 border-t border-neutral-700 p-4">
          <button
            className="px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-orange-700 rounded-lg hover:bg-orange-800 transition"
            onClick={handleSubmit}
          >
            Guardar Producto
          </button>
        </div>
      </div>

      {isCreatingCategory && (
        <CreateCategoryModal
          onClose={() => setIsCreatingCategory(false)}
          onCategoryCreated={handleCategoryCreated}
        />
      )}
    </div>
  );
};

export default Modal;
