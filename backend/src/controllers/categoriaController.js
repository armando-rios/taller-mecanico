// backend/src/controllers/categoriaController.js
const Categoria = require('../models/Categoria');

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({ activo: true });
        res.json(categorias);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener categorías',
            error: error.message
        });
    }
};

exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const categoriaExiste = await Categoria.findOne({ nombre });
        if (categoriaExiste) {
            return res.status(400).json({
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const categoria = await Categoria.create({
            nombre,
            descripcion
        });

        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear categoría',
            error: error.message
        });
    }
};

exports.updateCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, activo } = req.body;
        const categoria = await Categoria.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, activo },
            { new: true }
        );

        if (!categoria) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        res.json(categoria);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar categoría',
            error: error.message
        });
    }

};

exports.deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );

        if (!categoria) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar categoría',
            error: error.message
        });
    }

};
