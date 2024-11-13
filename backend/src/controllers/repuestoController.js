const Repuesto = require('../models/Repuesto');
const Venta = require('../models/Venta');

exports.getRepuestos = async (req, res) => {
    try {
        const repuestos = await Repuesto.find()
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
exports.getStats = async (req, res) => {
    try {
        // Obtener estadísticas generales
        const totalRepuestos = await Repuesto.countDocuments();
        const repuestosBajoStock = await Repuesto.countDocuments({
            $expr: { $lte: ['$stock', '$stockMinimo'] }

        });


        // Obtener valor total del inventario
        const valorInventario = await Repuesto.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: { $multiply: ['$stock', '$precio'] }
                    }
                }
            }
        ]);

        // Obtener repuestos más vendidos (últimos 30 días)

        const fechaInicio = new Date();
        fechaInicio.setDate(fechaInicio.getDate() - 30);

        const repuestosMasVendidos = await Venta.aggregate([
            {
                $match: {
                    createdAt: { $gte: fechaInicio }
                }
            },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.repuesto',
                    totalVendido: { $sum: '$items.cantidad' }
                }
            },
            {
                $lookup: {
                    from: 'repuestos',

                    localField: '_id',
                    foreignField: '_id',
                    as: 'repuesto'

                }
            },
            { $unwind: '$repuesto' },
            {
                $project: {
                    nombre: '$repuesto.nombre',
                    codigo: '$repuesto.codigo',
                    totalVendido: 1
                }
            },
            { $sort: { totalVendido: -1 } },
            { $limit: 5 }
        ]);

        // Obtener ventas por categoría
        const ventasPorCategoria = await Venta.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'repuestos',
                    localField: 'items.repuesto',
                    foreignField: '_id',
                    as: 'repuesto'
                }
            },

            { $unwind: '$repuesto' },
            {
                $lookup: {
                    from: 'categorias',
                    localField: 'repuesto.categoria',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            { $unwind: '$categoria' },
            {
                $group: {
                    _id: '$categoria.nombre',
                    total: { $sum: '$items.subtotal' }
                }
            },
            {
                $project: {

                    categoria: '$_id',
                    total: 1,
                    _id: 0
                }
            }
        ]);

        // Obtener repuestos por categoría
        const repuestosPorCategoria = await Repuesto.aggregate([
            {
                $lookup: {
                    from: 'categorias',
                    localField: 'categoria',
                    foreignField: '_id',
                    as: 'categoriaInfo'
                }
            },
            { $unwind: '$categoriaInfo' },
            {
                $group: {
                    _id: '$categoriaInfo.nombre',
                    cantidad: { $sum: 1 }
                }

            },
            {
                $project: {
                    categoria: '$_id',

                    cantidad: 1,
                    _id: 0
                }
            }
        ]);

        res.json({
            totalRepuestos,
            repuestosBajoStock,
            valorInventario: valorInventario[0]?.total || 0,
            repuestosMasVendidos,
            ventasPorCategoria,
            repuestosPorCategoria
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            message: 'Error al obtener estadísticas',
            error: error.message
        });
    }

};
