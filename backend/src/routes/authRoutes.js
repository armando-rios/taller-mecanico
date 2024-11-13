// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/users', protect, admin, getUsers);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
