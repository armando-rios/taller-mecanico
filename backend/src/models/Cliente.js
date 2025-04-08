const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },

    placa: {
        type: String,
        required: true
    },
    color: String,
    kilometraje: Number,
    combustible: {
        type: String,
        enum: ['Gasolina', 'Diesel', 'GLP', 'GNV', 'Híbrido', 'Eléctrico'],
        required: true
    },
    transmision: {
        type: String,
        enum: ['Manual', 'Automática', 'CVT'],
        required: true
    },
    vin: {
        type: String,
        sparse: true
    }
}, {
    timestamps: true,
    _id: true  // Asegurarnos de que cada vehículo tenga su propio _id
});
// En el modelo Cliente.js, actualizar historialServicioSchema
const historialServicioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    vehiculo: {
        type: String,  // ID del vehículo del cliente

        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Mantenimiento', 'Reparación', 'Diagnóstico', 'Emergencia']
    },
    descripcion: {
        type: String,
        required: false

    },
    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    },
    kilometraje: Number,
    diagnostico: String,
    trabajosRealizados: [String],
    repuestosUtilizados: [{
        repuesto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repuesto'
        },
        cantidad: Number,
        precio: Number,
        subtotal: Number
    }],
    costoManoObra: {

        type: Number,
        required: true,
        default: 0
    },
    costoRepuestos: {

        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,

        required: true,
        default: 0
    },
    tecnico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    observaciones: String,
    fechaEntrega: Date
});
const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    tipoDocumento: {
        type: String,
        required: true,
        enum: ['DNI', 'RUC', 'CE', 'Pasaporte']
    },

    numeroDocumento: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        calle: String,
        numero: String,
        distrito: String,
        ciudad: String,
        referencia: String
    },

    vehiculos: [vehiculoSchema],
    historialServicios: [historialServicioSchema],
    observaciones: String,
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);
