// frontend/src/pages/Clientes.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axios';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    UserPlusIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    EnvelopeIcon,
    IdentificationIcon
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [filtros, setFiltros] = useState({
        busqueda: '',

        estado: 'todos'
    });
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        email: '',
        telefono: '',
        direccion: {
            calle: '',
            numero: '',
            distrito: '',
            ciudad: '',
            referencia: ''
        },

        observaciones: '',
        estado: 'Activo'
    });

    const fetchClientes = async () => {
        try {
            const { data } = await axiosClient.get('/clientes');
            setClientes(data);
        } catch (error) {
            toast.error('Error al cargar clientes');

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCliente) {
                await axiosClient.put(`/clientes/${selectedCliente._id}`, formData);
                toast.success('Cliente actualizado exitosamente');
            } else {

                await axiosClient.post('/clientes', formData);
                toast.success('Cliente creado exitosamente');

            }
            setIsModalOpen(false);
            resetForm();
            fetchClientes();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al guardar cliente');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;


        try {
            await axiosClient.delete(`/clientes/${id}`);
            toast.success('Cliente eliminado');
            fetchClientes();
        } catch (error) {
            toast.error('Error al eliminar cliente');
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            tipoDocumento: 'DNI',
            numeroDocumento: '',
            email: '',
            telefono: '',
            direccion: {
                calle: '',
                numero: '',
                distrito: '',
                ciudad: '',
                referencia: ''
            },
            observaciones: '',
            estado: 'Activo'
        });
        setSelectedCliente(null);
    };

    const openEditModal = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            tipoDocumento: cliente.tipoDocumento,
            numeroDocumento: cliente.numeroDocumento,
            email: cliente.email,
            telefono: cliente.telefono,
            direccion: cliente.direccion || {
                calle: '',

                numero: '',
                distrito: '',

                ciudad: '',
                referencia: ''
            },
            observaciones: cliente.observaciones || '',

            estado: cliente.estado
        });
        setIsModalOpen(true);
    };


    const filtrarClientes = () => {
        return clientes.filter(cliente => {
            const matchBusqueda =
                `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||

                cliente.numeroDocumento.includes(filtros.busqueda) ||
                cliente.email.toLowerCase().includes(filtros.busqueda.toLowerCase());

            const matchEstado =
                filtros.estado === 'todos' ||
                cliente.estado.toLowerCase() === filtros.estado.toLowerCase();

            return matchBusqueda && matchEstado;

        });

    };

    const ClienteCard = ({ cliente }) => (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">

                <div>
                    <h3 className="text-lg font-medium text-gray-900">

                        {cliente.nombre} {cliente.apellido}
                    </h3>

                    <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                            <IdentificationIcon className="h-4 w-4 mr-2" />
                            {cliente.tipoDocumento}: {cliente.numeroDocumento}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <PhoneIcon className="h-4 w-4 mr-2" />
                            {cliente.telefono}
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />

                            {cliente.email}

                        </div>
                    </div>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente.estado === 'Activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'

                    }`}>
                    {cliente.estado}
                </span>
            </div>

            {cliente.vehiculos && cliente.vehiculos.length > 0 && (
                <div className="mt-4">

                    <h4 className="text-sm font-medium text-gray-900">Vehículos</h4>
                    <div className="mt-2 space-y-2">
                        {cliente.vehiculos.map((vehiculo, index) => (
                            <div key={index} className="text-sm text-gray-500">
                                {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placa}

                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => navigate(`/clientes/${cliente._id}`)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"

                >
                    Ver detalles
                </button>
                <button
                    onClick={() => openEditModal(cliente)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Editar
                </button>
                <button
                    onClick={() => handleDelete(cliente._id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Eliminar
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gestión de clientes y sus vehículos

                    </p>
                </div>
                <button
                    onClick={() => {

                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >

                    <UserPlusIcon className="h-5 w-5 mr-2" />

                    Nuevo Cliente
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buscar
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input

                                type="text"

                                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Buscar por nombre, documento o email"
                                value={filtros.busqueda}

                                onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="sm:w-48">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                        </label>
                        <select
                            className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={filtros.estado}
                            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                        >
                            <option value="todos">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtrarClientes().map((cliente) => (
                    <ClienteCard key={cliente._id} cliente={cliente} />
                ))}
            </div>

            {/* Modal de formulario */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Ingresa los datos del cliente

                                    </p>
                                </div>


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
                                            Datos Personales
                                        </Tab>

                                        <Tab
                                            className={({ selected }) =>
                                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                                ${selected
                                                    ? 'bg-white text-blue-700 shadow'
                                                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'}`
                                            }

                                        >
                                            Dirección
                                        </Tab>
                                    </Tab.List>

                                    <Tab.Panels className="mt-4">
                                        <Tab.Panel className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.nombre}

                                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Apellido
                                                    </label>

                                                    <input
                                                        type="text"
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.apellido}
                                                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Tipo de Documento
                                                    </label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.tipoDocumento}
                                                        onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                                                    >
                                                        <option value="DNI">DNI</option>
                                                        <option value="RUC">RUC</option>
                                                        <option value="CE">CE</option>
                                                        <option value="Pasaporte">Pasaporte</option>

                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Número de Documento
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required

                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.numeroDocumento}
                                                        onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input

                                                        type="email"
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Teléfono
                                                    </label>
                                                    <input
                                                        type="tel"

                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.telefono}
                                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Estado
                                                    </label>
                                                    <select
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.estado}
                                                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                                    >
                                                        <option value="Activo">Activo</option>
                                                        <option value="Inactivo">Inactivo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">

                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Calle
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.direccion.calle}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            direccion: {

                                                                ...formData.direccion,
                                                                calle: e.target.value
                                                            }
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Número
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                                        value={formData.direccion.numero}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            direccion: {
                                                                ...formData.direccion,
                                                                numero: e.target.value
                                                            }
                                                        })}

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Distrito
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.direccion.distrito}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            direccion: {
                                                                ...formData.direccion,
                                                                distrito: e.target.value
                                                            }
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Ciudad
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.direccion.ciudad}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            direccion: {
                                                                ...formData.direccion,

                                                                ciudad: e.target.value
                                                            }
                                                        })}
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Referencia
                                                    </label>
                                                    <textarea
                                                        rows="3"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        value={formData.direccion.referencia}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            direccion: {
                                                                ...formData.direccion,
                                                                referencia: e.target.value
                                                            }
                                                        })}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </Tab.Panel>

                                    </Tab.Panels>

                                </Tab.Group>

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">

                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {selectedCliente ? 'Actualizar' : 'Crear'}

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

        </div>
    );
}
