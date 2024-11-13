// backend/src/models/Venta.js
const mongoose = require('mongoose');


const ventaSchema = new mongoose.Schema({

    numeroVenta: {

        type: String,
        required: true,
        unique: true
    },
    cliente: {
        nombre: {

            type: String,
            required: true
        },
        telefono: String,

        vehiculo: String
    },
    items: [{
        repuesto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repuesto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precioUnitario: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,

            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },

    impuesto: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    metodoPago: {

        type: String,
        required: true,
        enum: ['efectivo', 'tarjeta', 'transferencia']
    },
    estado: {
        type: String,
        required: true,

        enum: ['completada', 'cancelada', 'pendiente'],
        default: 'completada'
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Venta', ventaSchema);
