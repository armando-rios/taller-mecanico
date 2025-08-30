import { useState } from "react";
import api from "../config/axios";

const useDeleteItem = ({
  endpoint,
  id,
  onDelete,
}: {
  endpoint: string;
  id: string;
  onDelete: (id: string) => void;
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      if (response) {
        console.log(response.data.message);
        onDelete(id);
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error(error);
      setShowConfirmModal(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowConfirmModal(false);
    }
  };

  return {
    showConfirmModal,
    setShowConfirmModal,
    handleDelete,
    handleBackdropClick,
  };
};

export default useDeleteItem;
