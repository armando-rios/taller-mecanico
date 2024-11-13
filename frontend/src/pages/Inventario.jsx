// frontend/src/pages/Inventario.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosClient from '../config/axios';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    FunnelIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Extraer el componente Filtros y manejar su propio estado
const Filtros = ({ onFiltrosChange, categorias }) => {
    const [filtrosLocales, setFiltrosLocales] = useState({
        categoria: '',

        busqueda: '',
        stockBajo: false
    });

    // Manejar cambios y propagar al componente padre
    const handleFiltrosChange = (newFiltros) => {
        setFiltrosLocales(newFiltros);
        onFiltrosChange(newFiltros);
    };


    const limpiarFiltros = () => {
        const filtrosLimpios = {
            categoria: '',
            busqueda: '',
            stockBajo: false
        };
        setFiltrosLocales(filtrosLimpios);
        onFiltrosChange(filtrosLimpios);
    };


    return (

        <div className="bg-white p-4 rounded-lg shadow mb-6">
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
                            placeholder="Buscar por nombre o código"
                            value={filtrosLocales.busqueda}
                            onChange={(e) => handleFiltrosChange({ 
                                ...filtrosLocales, 
                                busqueda: e.target.value 
                            })}
                        />
                    </div>
                </div>

                <div className="sm:w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select
                        className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={filtrosLocales.categoria}
                        onChange={(e) => handleFiltrosChange({ 
                            ...filtrosLocales, 
                            categoria: e.target.value 
                        })}
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map((categoria) => (
                            <option key={categoria._id} value={categoria._id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end space-x-4">
                    <div className="flex items-center">
                        <input
                            id="stockBajo"

                            type="checkbox"

                            checked={filtrosLocales.stockBajo}
                            onChange={(e) => handleFiltrosChange({ 
                                ...filtrosLocales, 
                                stockBajo: e.target.checked 
                            })}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="stockBajo" className="ml-2 block text-sm text-gray-700">
                            Stock bajo
                        </label>
                    </div>


                    <button
                        type="button"
                        onClick={limpiarFiltros}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <XMarkIcon className="h-4 w-4 mr-1" />
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Inventario() {
    const [repuestos, setRepuestos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRepuesto, setCurrentRepuesto] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        marca: '',
        modelo: '',
        categoria: '',
        precio: '',
        stock: '',
        stockMinimo: '',
        ubicacion: '',
        proveedor: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoriaForm, setCategoriaForm] = useState({
        nombre: '',
        descripcion: ''
    });
    const [filtros, setFiltros] = useState({
        categoria: '',
        busqueda: '',
        stockBajo: false
    });
    const handleFiltrosChange = (nuevosFiltros) => {
        setFiltros(nuevosFiltros);
    };

    const filtrarRepuestos = () => {
        return repuestos.filter(repuesto => {
            const matchBusqueda =
                repuesto.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                repuesto.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase());

            const matchCategoria =
                !filtros.categoria || repuesto.categoria._id === filtros.categoria;

            const matchStockBajo =
                !filtros.stockBajo || repuesto.stock <= repuesto.stockMinimo;

            return matchBusqueda && matchCategoria && matchStockBajo;
        });
    };

    const fetchRepuestos = async () => {
        try {
            const { data } = await axiosClient.get('/repuestos');
            setRepuestos(data);
        } catch (error) {
            toast.error('Error al cargar repuestos');
        } finally {
            setLoading(false);
        }
    };
    const limpiarFiltros = () => {
        setFiltros({
            categoria: '',
            busqueda: '',
            stockBajo: false
        });
    };

    useEffect(() => {
        fetchRepuestos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRepuesto) {
                await axiosClient.put(`/repuestos/${currentRepuesto._id}`, formData);
                toast.success('Repuesto actualizado');
            } else {
                await axiosClient.post('/repuestos', formData);
                toast.success('Repuesto creado');
            }
            setIsModalOpen(false);
            fetchRepuestos();

            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al guardar');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este repuesto?')) return;

        try {
            await axiosClient.delete(`/repuestos/${id}`);
            toast.success('Repuesto eliminado');
            fetchRepuestos();

        } catch (error) {


            toast.error('Error al eliminar repuesto');
        }
    };

    const resetForm = () => {
        setFormData({
            codigo: '',
            nombre: '',
            descripcion: '',

            marca: '',
            modelo: '',
            categoria: '',
            precio: '',
            stock: '',
            stockMinimo: '',
            ubicacion: '',
            proveedor: ''
        });
        setCurrentRepuesto(null);
    };

    const openEditModal = (repuesto) => {

        setCurrentRepuesto(repuesto);
        setFormData({

            codigo: repuesto.codigo,

            nombre: repuesto.nombre,
            descripcion: repuesto.descripcion || '',
            marca: repuesto.marca,

            modelo: repuesto.modelo || '',

            categoria: repuesto.categoria,

            precio: repuesto.precio,

            stock: repuesto.stock,
            stockMinimo: repuesto.stockMinimo,

            ubicacion: repuesto.ubicacion || '',
            proveedor: repuesto.proveedor || ''
        });

        setIsModalOpen(true);


    };

    const filteredRepuestos = repuestos.filter(repuesto =>
        repuesto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||

        repuesto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch categorías

    const fetchCategorias = async () => {
        try {
            const { data } = await axiosClient.get('/categorias');
            setCategorias(data);
        } catch (error) {
            toast.error('Error al cargar categorías');
        }
    };


    useEffect(() => {
        fetchCategorias();
    }, []);

    // Manejador para crear categoría
    const handleCreateCategoria = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post('/categorias', categoriaForm);
            toast.success('Categoría creada exitosamente');
            setShowCategoryModal(false);
            setCategoriaForm({ nombre: '', descripcion: '' });
            fetchCategorias();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear categoría');
        }
    };
    // En el formulario de repuesto, reemplaza el input de categoría por:
    const CategorySelect = () => (
        <div>


            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Categoría

                </label>
                <button

                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nueva Categoría
                </button>
            </div>
            <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.nombre}
                    </option>
                ))}
            </select>
        </div>
    );

    // Modal para crear categoría
    const CategoryModal = () => {
        // Mover el estado del formulario al componente modal
        const [formState, setFormState] = useState({
            nombre: '',
            descripcion: ''
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axiosClient.post('/categorias', formState);
                toast.success('Categoría creada exitosamente');

                setShowCategoryModal(false);
                fetchCategorias();

            } catch (error) {

                toast.error(error.response?.data?.message || 'Error al crear categoría');
            }
        };


        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre de la Categoría
                                    </label>

                                    <input
                                        type="text"

                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={formState.nombre}
                                        onChange={(e) => setFormState({

                                            ...formState,
                                            nombre: e.target.value
                                        })}

                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        rows="3"
                                        value={formState.descripcion}
                                        onChange={(e) => setFormState({
                                            ...formState,
                                            descripcion: e.target.value
                                        })}
                                    ></textarea>

                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">

                                <button
                                    type="submit"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    Crear Categoría
                                </button>
                                <button
                                    type="button"

                                    onClick={() => setShowCategoryModal(false)}
                                    className="mt-3 sm:mt-0 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        );
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>


                    <h1 className="text-2xl font-semibold text-gray-900">Inventario</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gestión de repuestos y stock
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);

                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Nuevo Repuesto
                </button>
            </div>
            <Filtros
                onFiltrosChange={handleFiltrosChange}
                categorias={categorias}
            />
            {(filtros.categoria || filtros.busqueda || filtros.stockBajo) && (
                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <FunnelIcon className="h-4 w-4" />
                    <span>Filtros activos:</span>
                    {filtros.categoria && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                            {categorias.find(c => c._id === filtros.categoria)?.nombre}
                        </span>
                    )}
                    {filtros.busqueda && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                            Búsqueda: {filtros.busqueda}
                        </span>
                    )}
                    {filtros.stockBajo && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                            Stock bajo
                        </span>
                    )}
                </div>
            )}

            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* ... thead existente ... */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtrarRepuestos().map((repuesto) => (
                            // ... contenido de la fila existente ...
                            <tr key={repuesto._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                                    {repuesto.codigo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {repuesto.nombre}

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {repuesto.marca}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${repuesto.stock <= repuesto.stockMinimo
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {repuesto.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${repuesto.precio.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                    {categorias.find(c => c._id === repuesto.categoria)?.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => openEditModal(repuesto)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(repuesto._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal para crear/editar repuesto */}
            {isModalOpen && (

                <div className="fixed z-10 inset-0 overflow-y-auto">

                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Código
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.codigo}
                                            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                        />
                                    </div>
                                    {/* Añadir campos similares para el resto de atributos */}

                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {currentRepuesto ? 'Actualizar' : 'Crear'}
                                    </button>
                                    {/* Continuación del código anterior */}
                                    <button

                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >


                                        Cancelar
                                    </button>
                                </div>

                                {/* Campos del formulario */}
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mt-4">

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
                                            Marca
                                        </label>
                                        <input


                                            type="text"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.marca}
                                            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                                        />
                                    </div>



                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Modelo
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.modelo}
                                            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <CategorySelect />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">

                                            Precio
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.precio}
                                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Stock Actual
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Stock Mínimo
                                        </label>
                                        <input
                                            type="number"
                                            required


                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                            value={formData.stockMinimo}
                                            onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Ubicación


                                        </label>

                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={formData.ubicacion}
                                            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Proveedor
                                        </label>
                                        <input
                                            type="text"

                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"


                                            value={formData.proveedor}
                                            onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}


                                        />
                                    </div>



                                    <div className="col-span-2">

                                        <label className="block text-sm font-medium text-gray-700">
                                            Descripción
                                        </label>
                                        <textarea

                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                            rows="3"
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showCategoryModal && (
                <CategoryModal />
            )}
        </div>
    );
}
