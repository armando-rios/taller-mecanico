// backend/src/routes/repuestoRoutes.js
const express = require('express');
const router = express.Router();
const {
    getRepuestos,
    createRepuesto,
    updateRepuesto,
    deleteRepuesto,
    getStats
} = require('../controllers/repuestoController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);


router.route('/')
    .get(protect, getRepuestos)
    .post(protect, admin, createRepuesto);

router.route('/:id')
    .put(protect, admin, updateRepuesto)
    .delete(protect, admin, deleteRepuesto);

module.exports = router;
