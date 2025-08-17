import api from "../../config/axios";

const DeleteButton = ({
  id,
  endpoint,
  onDelete,
}: {
  id: string;
  endpoint: string;
  onDelete: (id: string) => void;
}) => {
  const handleDelete = async () => {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      if (response) {
        console.log(response.data.message);
        onDelete(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Eliminar
    </button>
  );
};

export default DeleteButton;
