// frontend/src/components/DetalleRepuesto.jsx
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function DetalleRepuesto({ repuesto, onClose }) {
    if (!repuesto) return null;


    return (
        <Dialog
            as="div"
            className="relative z-10"
            open={true}
            onClose={onClose}

        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                        <div className="absolute right-0 top-0 pr-4 pt-4">
                            <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                onClick={onClose}
                            >

                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                                    Detalle del Repuesto

                                </Dialog.Title>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Código</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.codigo}</p>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-gray-500">Nombre</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.nombre}</p>
                                    </div>


                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Marca</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.marca}</p>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-gray-500">Modelo</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.modelo}</p>
                                    </div>


                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Precio</p>
                                        <p className="mt-1 text-sm text-gray-900">${repuesto.precio.toLocaleString()}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Stock Actual</p>
                                        <p className={`mt-1 text-sm ${repuesto.stock <= repuesto.stockMinimo
                                            ? 'text-red-600'
                                            : 'text-green-600'
                                            }`}>
                                            {repuesto.stock} unidades
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Stock Mínimo</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.stockMinimo} unidades</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-gray-500">Ubicación</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.ubicacion}</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-gray-500">Descripción</p>
                                        <p className="mt-1 text-sm text-gray-900">{repuesto.descripcion}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>

    );
}
