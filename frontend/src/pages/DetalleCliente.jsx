// frontend/src/pages/DetalleCliente.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosClient from '../config/axios';
import {
    UserCircleIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    PlusIcon,
    ClockIcon,
    CalendarIcon,
    SwatchIcon,
    BoltIcon,
    DocumentChartBarIcon,
    AdjustmentsHorizontalIcon,
    CheckCircleIcon,
    IdentificationIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

export default function DetalleCliente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVehiculoModalOpen, setIsVehiculoModalOpen] = useState(false);
    const [isServicioModalOpen, setIsServicioModalOpen] = useState(false);
    const [vehiculoForm, setVehiculoForm] = useState({
        marca: '',
        modelo: '',
        año: new Date().getFullYear(),
        placa: '',
        color: '',
        kilometraje: '',
        combustible: 'Gasolina',
        transmision: 'Manual',
        vin: ''
    });

    const [servicioForm, setServicioForm] = useState({
        tipo: 'Mantenimiento',
        descripcion: '',
        kilometraje: '',
        diagnostico: '',
        estado: 'Pendiente',
        trabajosRealizados: [],
        observaciones: '',
        fechaEntrega: ''
    });

    const fetchCliente = async () => {
        try {
            const { data } = await axiosClient.get(`/clientes/${id}`);
            setCliente(data);
        } catch (error) {

            toast.error('Error al cargar datos del cliente');
            navigate('/clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCliente();
    }, [id]);


    const handleVehiculoSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post(`/clientes/${id}/vehiculos`, vehiculoForm);
            toast.success('Vehículo agregado exitosamente');
            setIsVehiculoModalOpen(false);
            setVehiculoForm({
                marca: '',
                modelo: '',
                año: new Date().getFullYear(),
                placa: '',
                color: '',
                kilometraje: '',
                combustible: 'Gasolina',
                transmision: 'Manual',
                vin: ''
            });
            fetchCliente();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al agregar vehículo');
        }
    };


    const handleServicioSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post(`/clientes/${id}/servicios`, servicioForm);
            toast.success('Servicio registrado exitosamente');
            setIsServicioModalOpen(false);
            setServicioForm({

                tipo: 'Mantenimiento',
                descripcion: '',
                kilometraje: '',
                diagnostico: '',
                estado: 'Pendiente',

                trabajosRealizados: [],
                observaciones: '',
                fechaEntrega: ''
            });
            fetchCliente();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al registrar servicio');
        }
    };

    const InfoCard = ({ icon: Icon, title, value }) => (
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
                <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <div>
                <p className="text-lg font-bold text-gray-500">{title}</p>
                <p className="mt-1 text-sm text-gray-900">{value}</p>
            </div>
        </div>
    );

    if (loading) {
        return (

            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!cliente) {

        return null;
    }


    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            {cliente.nombre} {cliente.apellido}
                        </h2>
                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <UserCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {cliente.tipoDocumento}: {cliente.numeroDocumento}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {cliente.telefono}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {cliente.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            onClick={() => setIsVehiculoModalOpen(true)}
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Nuevo Vehículo
                        </button>
                        <button
                            onClick={() => setIsServicioModalOpen(true)}
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Nuevo Servicio
                        </button>
                    </div>
                </div>

                {cliente.direccion && (
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {`${cliente.direccion.calle} ${cliente.direccion.numero}, ${cliente.direccion.distrito}, ${cliente.direccion.ciudad}`}
                    </div>
                )}
            </div>


            {/* Contenido Principal */}

            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab

                        className={({ selected }) =>
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                            ${selected
                                ? 'bg-white text-blue-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'}`
                        }
                    >
                        Vehículos
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                            ${selected
                                ? 'bg-white text-blue-700 shadow'

                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'}`
                        }
                    >
                        Historial de Servicios
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {cliente.vehiculos?.map((vehiculo, index) => (
                                <div key={index} className="bg-white shadow-xl rounded-lg p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 text-center">

                                        {vehiculo.marca} {vehiculo.modelo}
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <InfoCard
                                            icon={IdentificationIcon}
                                            title="Placa"
                                            value={vehiculo.placa}

                                        />
                                        <InfoCard
                                            icon={CalendarIcon}
                                            title="Año"
                                            value={vehiculo.año}
                                        />
                                        <InfoCard
                                            icon={SwatchIcon}
                                            title="Color"
                                            value={vehiculo.color}
                                        />

                                        <InfoCard
                                            icon={ClockIcon}
                                            title="Kilometraje"
                                            value={`${vehiculo.kilometraje} km`}
                                        />
                                        <InfoCard
                                            icon={BoltIcon}
                                            title="Combustible"
                                            value={vehiculo.combustible}
                                        />
                                        <InfoCard
                                            icon={AdjustmentsHorizontalIcon}
                                            title="Transmisión"
                                            value={vehiculo.transmision}
                                        />

                                        {vehiculo.vin && (
                                            <InfoCard
                                                icon={DocumentChartBarIcon}
                                                title="VIN"
                                                value={vehiculo.vin}

                                            />
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="space-y-6">
                            {cliente.historialServicios?.map((servicio, index) => (
                                <div key={index} className="bg-white shadow rounded-lg p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {servicio.tipo}
                                            </h3>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                {new Date(servicio.fecha).toLocaleDateString()}
                                            </p>

                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${servicio.estado === 'Completado'
                                            ? 'bg-green-100 text-green-800'
                                            : servicio.estado === 'Pendiente'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : servicio.estado === 'En Proceso'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {servicio.estado}

                                        </span>
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Descripción
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {servicio.descripcion}
                                                </dd>

                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Kilometraje
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {servicio.kilometraje} km
                                                </dd>
                                            </div>
                                            {servicio.diagnostico && (
                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Diagnóstico
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {servicio.diagnostico}
                                                    </dd>
                                                </div>
                                            )}
                                            {servicio.trabajosRealizados?.length > 0 && (
                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Trabajos Realizados
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {servicio.trabajosRealizados.map((trabajo, idx) => (
                                                                <li key={idx}>{trabajo}</li>

                                                            ))}
                                                        </ul>
                                                    </dd>
                                                </div>

                                            )}
                                            {servicio.repuestosUtilizados?.length > 0 && (
                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Repuestos Utilizados
                                                    </dt>
                                                    <dd className="mt-1">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                                        Repuesto
                                                                    </th>
                                                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                                                        Cantidad
                                                                    </th>
                                                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                                                        Precio
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {servicio.repuestosUtilizados.map((repuesto, idx) => (
                                                                    <tr key={idx}>
                                                                        <td className="px-3 py-2 text-sm text-gray-900">
                                                                            {repuesto.repuesto.nombre}
                                                                        </td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                                                            {repuesto.cantidad}
                                                                        </td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">
                                                                            ${repuesto.precio.toLocaleString()}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </dd>

                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* Modal de Nuevo Vehículo */}
            {isVehiculoModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleVehiculoSubmit}>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Nuevo Vehículo
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Ingresa los datos del vehículo
                                    </p>

                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Marca
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.marca}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, marca: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Modelo

                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.modelo}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, modelo: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Año
                                        </label>
                                        <input
                                            type="number"
                                            required

                                            min="1900"
                                            max={new Date().getFullYear() + 1}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.año}

                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, año: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Placa
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.placa}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, placa: e.target.value })}
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium text-gray-700">
                                            Color

                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.color}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, color: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">

                                            Kilometraje
                                        </label>

                                        <input
                                            type="number"
                                            min="0"

                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                            value={vehiculoForm.kilometraje}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, kilometraje: e.target.value })}

                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Combustible
                                        </label>
                                        <select
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.combustible}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, combustible: e.target.value })}
                                        >
                                            <option value="Gasolina">Gasolina</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="GLP">GLP</option>
                                            <option value="GNV">GNV</option>
                                            <option value="Híbrido">Híbrido</option>
                                            <option value="Eléctrico">Eléctrico</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Transmisión
                                        </label>
                                        <select
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={vehiculoForm.transmision}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, transmision: e.target.value })}
                                        >
                                            <option value="Manual">Manual</option>
                                            <option value="Automática">Automática</option>
                                            <option value="CVT">CVT</option>
                                        </select>
                                    </div>


                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            VIN (Opcional)
                                        </label>
                                        <input
                                            type="text"

                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                            value={vehiculoForm.vin}
                                            onChange={(e) => setVehiculoForm({ ...vehiculoForm, vin: e.target.value })}

                                        />
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"

                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsVehiculoModalOpen(false)}
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


            {/* Modal de Nuevo Servicio */}
            {isServicioModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>


                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleServicioSubmit}>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Nuevo Servicio
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Registra un nuevo servicio

                                    </p>
                                </div>


                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>

                                        <label className="block text-sm font-medium text-gray-700">
                                            Tipo de Servicio
                                        </label>
                                        <select
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.tipo}
                                            onChange={(e) => setServicioForm({ ...servicioForm, tipo: e.target.value })}
                                        >
                                            <option value="Mantenimiento">Mantenimiento</option>
                                            <option value="Reparación">Reparación</option>
                                            <option value="Diagnóstico">Diagnóstico</option>
                                            <option value="Emergencia">Emergencia</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Kilometraje Actual
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.kilometraje}
                                            onChange={(e) => setServicioForm({ ...servicioForm, kilometraje: e.target.value })}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Descripción
                                        </label>
                                        <textarea
                                            required
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.descripcion}
                                            onChange={(e) => setServicioForm({ ...servicioForm, descripcion: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Diagnóstico Preliminar
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                            value={servicioForm.diagnostico}
                                            onChange={(e) => setServicioForm({ ...servicioForm, diagnostico: e.target.value })}

                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Estado
                                        </label>

                                        <select
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.estado}
                                            onChange={(e) => setServicioForm({ ...servicioForm, estado: e.target.value })}

                                        >
                                            <option value="Pendiente">Pendiente</option>

                                            <option value="En Proceso">En Proceso</option>
                                            <option value="Completado">Completado</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fecha Estimada de Entrega
                                        </label>
                                        <input

                                            type="datetime-local"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.fechaEntrega}
                                            onChange={(e) => setServicioForm({ ...servicioForm, fechaEntrega: e.target.value })}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Observaciones
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={servicioForm.observaciones}
                                            onChange={(e) => setServicioForm({ ...servicioForm, observaciones: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        Guardar Servicio
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsServicioModalOpen(false)}
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

        </div>
    );
}
