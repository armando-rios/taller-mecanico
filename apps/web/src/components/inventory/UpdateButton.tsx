import { Part } from "../../types/inventory";

const UpdateButton = ({
  part,
  onEdit,
}: {
  part: Part;
  onEdit: (part: Part) => void;
}) => {
  const handleUpdate = () => {
    onEdit(part); // Pasa el producto completo al padre
  };

  return (
    <button onClick={handleUpdate} className="text-orange-700 hover:underline">
      Editar
    </button>
  );
};

export default UpdateButton;
