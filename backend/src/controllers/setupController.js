// backend/src/controllers/setupController.js
const User = require('../models/User');


exports.createInitialAdmin = async (req, res) => {
    try {
        // Verificar si ya existe algún usuario admin
        const adminExists = await User.findOne({ rol: 'admin' });


        if (adminExists) {
            return res.status(400).json({
                message: 'Ya existe un usuario administrador'
            });
        }

        // Crear el primer usuario admin
        const admin = await User.create({
            nombre: 'Administrador',
            email: req.body.email,
            password: req.body.password,
            rol: 'admin'
        });

        res.status(201).json({
            message: 'Administrador creado exitosamente',
            admin: {
                _id: admin._id,

                nombre: admin.nombre,
                email: admin.email,

                rol: admin.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear administrador inicial',
            error: error.message
        });
    }
};
