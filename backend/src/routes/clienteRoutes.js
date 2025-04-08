// backend/src/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const {
    getClientes,
    getClienteById,
    createCliente,

    updateCliente,
    deleteCliente,
    addVehiculo,

    addServicio,
    updateServicio,
    addRepuestoAServicio
} = require('../controllers/clienteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getClientes)
    .post(protect, createCliente);

router.route('/:id')
    .get(protect, getClienteById)
    .put(protect, updateCliente)
    .delete(protect, deleteCliente);

router.route('/:id/vehiculos')
    .post(protect, addVehiculo);

router.route('/:id/servicios')
    .post(protect, addServicio);

router.route('/:clienteId/servicios/:servicioId')
    .put(protect, updateServicio);

router.route('/:clienteId/servicios/:servicioId/repuestos')
    .post(protect, addRepuestoAServicio);

module.exports = router;
