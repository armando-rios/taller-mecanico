import { useEffect, useState } from "react";
import api from "../config/axios";

const useCrudResource = <T extends { _id: string }>(endpoint: string) => {
  const [items, setItems] = useState<T[]>([]);
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // CRUD operations
  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
    setFilteredItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleUpdate = (updatedItem: T) => {
    const updateFn = (prev: T[]) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item));
    setItems(updateFn);
    setFilteredItems(updateFn);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
  };

  const handleViewDetails = (item: T) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedItem(null);
  };

  const closeEditModal = () => {
    setEditingItem(null);
  };

  // Fetch básico (puede ser sobreescrito)
  const fetchItems = async () => {
    try {
      const { data } = await api.get(endpoint);
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    setItems,
    filteredItems,
    selectedItem,
    editingItem,
    isDetailsModalOpen,
    handleDelete,
    handleUpdate,
    handleEdit,
    handleViewDetails,
    closeDetailsModal,
    closeEditModal,
    fetchItems,
    setFilteredItems,
  };
};

export default useCrudResource;
