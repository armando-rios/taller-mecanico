import { useState } from "react";
import Close from "../../icons/Close";
import Input from "./Input";
import api from "../../config/axios";

interface CreateCategoryModalProps {
  onClose: () => void;
  onCategoryCreated: (categoryId: string) => void;
}

const CreateCategoryModal = ({
  onClose,
  onCategoryCreated,
}: CreateCategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const { data } = await api.post("/categories", {
        name: newCategoryName,
        description: newCategoryDescription,
      });
      onCategoryCreated(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-orange-700">
            Crear Nueva Categoría
          </h3>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="mb-4">
          <Input
            title="Nombre de la Categoría"
            value={newCategoryName}
            setValue={setNewCategoryName}
          />
        </div>
        <div className="mb-4">
          <Input
            title="Descripción de la Categoría"
            value={newCategoryDescription}
            setValue={setNewCategoryDescription}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-orange-700 rounded-lg hover:bg-orange-800 transition"
            onClick={handleCreateCategory}
          >
            Crear Categoría
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
