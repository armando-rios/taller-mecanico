// backend/src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const {
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../controllers/categoriaController');
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/')
    .get(protect, getCategorias)
    .post(protect, admin, createCategoria);

router.route('/:id')
    .put(protect, admin, updateCategoria)
    .delete(protect, admin, deleteCategoria);

module.exports = router;
