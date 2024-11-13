const mongoose = require('mongoose');

const repuestoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true

    },
    nombre: {
        type: String,
        required: true

    },
    descripcion: String,
    marca: {

        type: String,
        required: true
    },
    modelo: String,
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    stockMinimo: {
        type: Number,
        required: true,
        default: 5
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    ubicacion: String,
    proveedor: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Repuesto', repuestoSchema);
