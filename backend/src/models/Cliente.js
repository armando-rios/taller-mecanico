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
        required: true,
        unique: true
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
        unique: true,
        sparse: true
    }
});

const historialServicioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        required: true,

        enum: ['Mantenimiento', 'Reparación', 'Diagnóstico', 'Emergencia']
    },
    descripcion: {
        type: String,
        required: true
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
        precio: Number
    }],
    costoManoObra: Number,
    costoRepuestos: Number,

    total: Number,
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
