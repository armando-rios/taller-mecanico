// frontend/src/pages/Ventas.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosClient from '../config/axios';
import { PlusIcon, PrinterIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DetalleVenta from '../components/DetalleVenta';

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [repuestos, setRepuestos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);

    const [loading, setLoading] = useState(true);

    const [ventaForm, setVentaForm] = useState({
        cliente: {
            nombre: '',
            telefono: '',

            vehiculo: ''
        },
        items: [],
        metodoPago: 'efectivo'
    });
    const [currentItem, setCurrentItem] = useState({
        repuesto: '',
        cantidad: 1
    });


    const fetchVentas = async () => {

        try {
            const { data } = await axiosClient.get('/ventas');
            setVentas(data);
        } catch (error) {
            toast.error('Error al cargar ventas');
        } finally {
            setLoading(false);
        }
    };

    const fetchRepuestos = async () => {
        try {

            const { data } = await axiosClient.get('/repuestos');
            setRepuestos(data);
        } catch (error) {
            toast.error('Error al cargar repuestos');
        }
    };

    useEffect(() => {
        fetchVentas();
        fetchRepuestos();
    }, []);

    const handleAddItem = () => {
        if (!currentItem.repuesto || currentItem.cantidad < 1) {
            toast.error('Seleccione un repuesto y cantidad válida');
            return;
        }

        const repuesto = repuestos.find(r => r._id === currentItem.repuesto);
        if (currentItem.cantidad > repuesto.stock) {
            toast.error(`Stock insuficiente. Disponible: ${repuesto.stock}`);
            return;
        }

        setVentaForm(prev => ({
            ...prev,
            items: [...prev.items, { ...currentItem }]

        }));

        setCurrentItem({ repuesto: '', cantidad: 1 });
    };

    const handleRemoveItem = (index) => {
        setVentaForm(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const calcularTotal = () => {
        return ventaForm.items.reduce((total, item) => {
            const repuesto = repuestos.find(r => r._id === item.repuesto);
            return total + (repuesto?.precio || 0) * item.cantidad;
        }, 0);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (ventaForm.items.length === 0) {
            toast.error('Agregue al menos un item');
            return;
        }


        try {
            await axiosClient.post('/ventas', ventaForm);
            toast.success('Venta registrada exitosamente');
            setIsModalOpen(false);
            setVentaForm({

                cliente: { nombre: '', telefono: '', vehiculo: '' },
                items: [],
                metodoPago: 'efectivo'
            });
            fetchVentas();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al registrar venta');
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Ventas</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gestión de ventas y facturación
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}

                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Nueva Venta
                </button>
            </div>

            {/* Lista de Ventas */}
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Venta</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {ventas.map((venta) => (
                            <tr key={venta._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {venta.numeroVenta}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {venta.cliente.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(venta.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${venta.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {venta.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedVenta(venta)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => {/* Implementar impresión */ }}

                                        className="text-indigo-600 hover:text-indigo-900"

                                    >
                                        <PrinterIcon className="h-5 w-5" />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Nueva Venta */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Datos del Cliente */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Datos del Cliente</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={ventaForm.cliente.nombre}
                                                onChange={(e) => setVentaForm(prev => ({
                                                    ...prev,
                                                    cliente: { ...prev.cliente, nombre: e.target.value }
                                                }))}
                                            />

                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={ventaForm.cliente.telefono}
                                                onChange={(e) => setVentaForm(prev => ({
                                                    ...prev,
                                                    // Continuación del código anterior...
                                                    cliente: { ...prev.cliente, telefono: e.target.value }
                                                }))}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Vehículo</label>
                                            <input

                                                type="text"

                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={ventaForm.cliente.vehiculo}
                                                onChange={(e) => setVentaForm(prev => ({
                                                    ...prev,
                                                    cliente: { ...prev.cliente, vehiculo: e.target.value }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Agregar Items */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Items</h3>
                                    <div className="grid grid-cols-6 gap-4">
                                        <div className="col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Repuesto</label>
                                            <select
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={currentItem.repuesto}
                                                onChange={(e) => setCurrentItem(prev => ({
                                                    ...prev,
                                                    repuesto: e.target.value
                                                }))}
                                            >
                                                <option value="">Seleccione un repuesto</option>
                                                {repuestos.map(repuesto => (
                                                    <option key={repuesto._id} value={repuesto._id}>
                                                        {repuesto.nombre} - Stock: {repuesto.stock}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={currentItem.cantidad}
                                                onChange={(e) => setCurrentItem(prev => ({
                                                    ...prev,
                                                    cantidad: parseInt(e.target.value)
                                                }))}
                                            />
                                        </div>
                                        <div className="col-span-1 flex items-end">
                                            <button
                                                type="button"
                                                onClick={handleAddItem}
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <PlusIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Lista de items agregados */}
                                    <div className="mt-4">
                                        {ventaForm.items.map((item, index) => {
                                            const repuesto = repuestos.find(r => r._id === item.repuesto);
                                            const subtotal = repuesto ? repuesto.precio * item.cantidad : 0;


                                            return (

                                                <div key={index} className="flex justify-between items-center py-2 border-b">
                                                    <div>
                                                        <p className="font-medium">{repuesto?.nombre}</p>
                                                        <p className="text-sm text-gray-500">

                                                            {item.cantidad} x ${repuesto?.precio}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="font-medium">${subtotal}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveItem(index)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Total */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="font-medium">Total:</span>
                                        <span className="text-2xl font-bold">${calcularTotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Método de Pago */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={ventaForm.metodoPago}
                                        onChange={(e) => setVentaForm(prev => ({
                                            ...prev,
                                            metodoPago: e.target.value
                                        }))}
                                    >
                                        <option value="efectivo">Efectivo</option>
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="transferencia">Transferencia</option>
                                    </select>
                                </div>

                                {/* Botones */}
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        Registrar Venta
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 sm:mt-0 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >

                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {selectedVenta && (
                <DetalleVenta
                    venta={selectedVenta}
                    onClose={() => setSelectedVenta(null)}
                />
            )}
        </div>
    );
}
