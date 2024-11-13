const Repuesto = require('../models/Repuesto');

exports.getRepuestos = async (req, res) => {
    try {
        const repuestos = await Repuesto.find();
        res.json(repuestos);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener repuestos',
            error: error.message
        });
    }
};


exports.createRepuesto = async (req, res) => {
    try {
        const repuesto = await Repuesto.create(req.body);
        res.status(201).json(repuesto);
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear repuesto',
            error: error.message
        });
    }
};

exports.updateRepuesto = async (req, res) => {
    try {
        const repuesto = await Repuesto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!repuesto) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }

        res.json(repuesto);

    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar repuesto',
            error: error.message
        });
    }
};

exports.deleteRepuesto = async (req, res) => {
    try {
        const repuesto = await Repuesto.findByIdAndDelete(req.params.id);
        if (!repuesto) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json({ message: 'Repuesto eliminado' });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar repuesto',
            error: error.message
        });
    }
};
