// backend/src/routes/ventaRoutes.js
const express = require('express');
const router = express.Router();
const {
    createVenta,
    getVentas,
    getVentaById,
    getStats
} = require('../controllers/ventaController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getVentas)
    .post(protect, createVenta);

router.get('/stats', protect, getStats);
router.get('/:id', protect, getVentaById);

module.exports = router;
