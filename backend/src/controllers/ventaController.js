// backend/src/controllers/ventaController.js
const Venta = require('../models/Venta');
const Repuesto = require('../models/Repuesto');


exports.createVenta = async (req, res) => {
    try {
        const { cliente, items, metodoPago } = req.body;

        // Verificar stock y calcular totales
        let subtotal = 0;
        for (const item of items) {
            const repuesto = await Repuesto.findById(item.repuesto);
            if (!repuesto) {
                return res.status(404).json({
                    message: `Repuesto no encontrado: ${item.repuesto}`
                });
            }
            if (repuesto.stock < item.cantidad) {
                return res.status(400).json({
                    message: `Stock insuficiente para ${repuesto.nombre}`
                });
            }

            // Actualizar stock
            await Repuesto.findByIdAndUpdate(item.repuesto, {
                $inc: { stock: -item.cantidad }
            });


            item.precioUnitario = repuesto.precio;
            item.subtotal = repuesto.precio * item.cantidad;
            subtotal += item.subtotal;
        }


        const impuesto = subtotal * 0.18; // 18% de IGV
        const total = subtotal + impuesto;


        // Generar número de venta
        const lastVenta = await Venta.findOne().sort({ createdAt: -1 });
        let numeroVenta;
        if (lastVenta) {
            const lastNumber = parseInt(lastVenta.numeroVenta.slice(1));
            numeroVenta = `V${(lastNumber + 1).toString().padStart(4, '0')}`;
        } else {
            numeroVenta = 'V0001';

        }


        // Crear la venta
        const venta = await Venta.create({
            numeroVenta,
            cliente,

            items,
            subtotal,
            impuesto,
            total,
            metodoPago,
            vendedor: req.user._id
        });

        // Populate los datos del vendedor y los repuestos
        await venta.populate([
            { path: 'vendedor', select: 'nombre' },
            { path: 'items.repuesto', select: 'nombre codigo precio' }
        ]);


        res.status(201).json(venta);
    } catch (error) {
        console.error('Error al crear venta:', error);
        res.status(500).json({
            message: 'Error al crear venta',
            error: error.message
        });
    }
};


exports.getVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
            .populate('vendedor', 'nombre')
            .populate('items.repuesto', 'nombre codigo precio')
            .sort({ createdAt: -1 });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener ventas',
            error: error.message
        });
    }
}
exports.getVentaById = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id)
            .populate('vendedor', 'nombre')
            .populate('items.repuesto', 'nombre codigo precio');

        if (!venta) {
            return res.status(404).json({
                message: 'Venta no encontrada'
            });
        }

        res.json(venta);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener venta',
            error: error.message
        });
    }
};

exports.getStats = async (req, res) => {
    try {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        // Estadísticas de ventas
        const ventasHoy = await Venta.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        const ventasSemana = await Venta.aggregate([
            { $match: { createdAt: { $gte: weekAgo } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        res.json({
            ventasHoy: ventasHoy[0]?.total || 0,
            ventasSemana: ventasSemana[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener estadísticas',

            error: error.message
        });
    }
};
