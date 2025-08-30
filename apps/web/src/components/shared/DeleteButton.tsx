import Close from "../../icons/Close";
import useDeleteItem from "../../hooks/useDeleteItem";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  onDelete: (id: string) => void;
}

const DeleteButton = ({ id, endpoint, onDelete }: DeleteButtonProps) => {
  const {
    setShowConfirmModal,
    handleDelete,
    showConfirmModal,
    handleBackdropClick,
  } = useDeleteItem({ endpoint, id, onDelete });

  return (
    <>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="text-red-500 hover:underline"
      >
        Eliminar
      </button>

      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}
        >
          <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-neutral-700 p-4">
              <h3 className="text-lg font-bold">Confirmar Eliminación</h3>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowConfirmModal(false)}
                aria-label="Cerrar modal"
              >
                <Close />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-neutral-300">
                ¿Estás seguro de que deseas eliminar este elemento? Esta acción
                no se puede deshacer.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 border-t border-neutral-700 p-4">
              <button
                className="px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
