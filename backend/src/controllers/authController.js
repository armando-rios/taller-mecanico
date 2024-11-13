// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {

        expiresIn: '30d',
    });
};


exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: 'El usuario ya existe'
            });
        }

        // Verificar que el rol sea válido
        if (rol && !['admin', 'vendedor'].includes(rol)) {
            return res.status(400).json({
                message: 'Rol no válido'
            });
        }


        // Crear el usuario
        const user = await User.create({
            nombre,
            email,
            password,

            rol: rol || 'vendedor' // Si no se especifica rol, será vendedor
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            message: 'Error al crear usuario',
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Email o contraseña incorrectos'
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Email o contraseña incorrectos'
            });
        }

        res.json({

            _id: user._id,

            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

// Obtener todos los usuarios (solo admin)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {

        res.status(500).json({
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }

};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        await user.remove();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
};

// Actualizar usuario (solo admin o el propio usuario)
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                message: 'Usuario no encontrado'
            });
        }

        // Verificar si el usuario actual tiene permisos para actualizar
        if (req.user.rol !== 'admin' && req.user._id.toString() !== req.params.id) {
            return res.status(401).json({
                message: 'No autorizado para actualizar este usuario'
            });
        }

        const { nombre, email, password, rol } = req.body;

        // Solo el admin puede cambiar roles
        if (rol && req.user.rol !== 'admin') {
            return res.status(401).json({
                message: 'No autorizado para cambiar roles'
            });
        }

        user.nombre = nombre || user.nombre;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }
        if (rol && req.user.rol === 'admin') {
            user.rol = rol;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            nombre: updatedUser.nombre,
            email: updatedUser.email,
            rol: updatedUser.rol

        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario',
            error: error.message
        });
    }
};
