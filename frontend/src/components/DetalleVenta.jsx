// frontend/src/components/DetalleVenta.jsx
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function DetalleVenta({ venta, onClose }) {
    if (!venta) return null;

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
                                    Detalle de Venta #{venta.numeroVenta}
                                </Dialog.Title>


                                <div className="space-y-6">
                                    {/* Información del Cliente */}
                                    <div>

                                        <h4 className="text-lg font-medium text-gray-900">Información del Cliente</h4>
                                        <div className="mt-2 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Nombre</p>
                                                <p className="mt-1 text-sm text-gray-900">{venta.cliente.nombre}</p>
                                            </div>
                                            <div>

                                                <p className="text-sm font-medium text-gray-500">Teléfono</p>

                                                <p className="mt-1 text-sm text-gray-900">{venta.cliente.telefono}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-sm font-medium text-gray-500">Vehículo</p>
                                                <p className="mt-1 text-sm text-gray-900">{venta.cliente.vehiculo}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items de la venta */}
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900">Items</h4>
                                        <div className="mt-2">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Repuesto</th>
                                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {venta.items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-3 py-2 text-sm text-gray-900">
                                                                {item.repuesto.nombre}

                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                                                {item.cantidad}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                                                ${item.precioUnitario.toLocaleString()}

                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                                                ${item.subtotal.toLocaleString()}

                                                            </td>
                                                        </tr>

                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    {/* Resumen de la venta */}
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Método de Pago</p>
                                                <p className="mt-1 text-sm text-gray-900 capitalize">{venta.metodoPago}</p>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Subtotal:</span>
                                                    <span className="text-sm text-gray-900 ml-4">
                                                        ${venta.subtotal.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">IGV (18%):</span>
                                                    <span className="text-sm text-gray-900 ml-4">
                                                        ${venta.impuesto.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between font-medium">
                                                    <span className="text-sm text-gray-900">Total:</span>
                                                    <span className="text-sm text-gray-900 ml-4">
                                                        ${venta.total.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="border-t pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Fecha de Venta</p>
                                                <p className="mt-1 text-sm text-gray-900">
                                                    {new Date(venta.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Vendedor</p>
                                                <p className="mt-1 text-sm text-gray-900">{venta.vendedor?.nombre}</p>
                                            </div>
                                        </div>
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
