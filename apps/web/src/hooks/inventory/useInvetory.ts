import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Category, Part } from "../../types/inventory";

const useInventory = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPart(null); // Resetea el modo edición
  };

  const handleEdit = (part: Part) => {
    setEditingPart(part);
  };

  const handleUpdate = (updatedPart: Part) => {
    setParts((prev) =>
      prev.map((part) => (part._id === updatedPart._id ? updatedPart : part)),
    );
    setFilteredParts((prev) =>
      prev.map((part) => (part._id === updatedPart._id ? updatedPart : part)),
    );
  };

  const handleDelete = (id: string) => {
    setParts((prev) => prev.filter((part) => part._id !== id));
    setFilteredParts((prev) => prev.filter((part) => part._id !== id));
  };

  const fetchParts = async () => {
    try {
      const [partsData, categoriesData] = await Promise.all([
        api.get("/parts"),
        api.get("/categories"),
      ]);
      setCategories(categoriesData.data);
      setParts(partsData.data);
      setFilteredParts(partsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const searchPart = (part: Part, searchTerm: string) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code.toLowerCase().includes(searchTerm.toLowerCase());

  return {
    parts,
    filteredParts,
    editingPart,
    isModalOpen,
    categories,
    handleDelete,
    handleEdit,
    handleUpdate,
    fetchParts,
    setFilteredParts,
    setIsModalOpen,
    closeModal,
    searchPart,
  };
};

export default useInventory;
