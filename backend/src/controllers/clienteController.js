// backend/src/controllers/clienteController.js
const Cliente = require('../models/Cliente');
const Repuesto = require('../models/Repuesto');

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find()
            .sort({ createdAt: -1 });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener clientes',
            error: error.message
        });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id)
            .populate('historialServicios.repuestosUtilizados.repuesto')
            .populate('historialServicios.tecnico', 'nombre');

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener cliente',
            error: error.message
        });
    }

};

exports.createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear cliente',
            error: error.message
        });
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar cliente',
            error: error.message
        });
    }
};


exports.deleteCliente = async (req, res) => {

    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });

        }

        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar cliente',
            error: error.message
        });
    }
};

exports.addVehiculo = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);


        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        cliente.vehiculos.push(req.body);
        await cliente.save();

        res.json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al añadir vehículo',
            error: error.message
        });
    }
};

exports.addServicio = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        const servicio = {
            ...req.body,
            fecha: new Date(),
            tecnico: req.user._id
        };

        cliente.historialServicios.push(servicio);
        await cliente.save();

        res.json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al añadir servicio',
            error: error.message

        });

    }
};

exports.updateServicio = async (req, res) => {

    try {
        const cliente = await Cliente.findOneAndUpdate(
            {
                '_id': req.params.clienteId,

                'historialServicios._id': req.params.servicioId
            },
            {
                $set: {
                    'historialServicios.$': {
                        ...req.body,
                        _id: req.params.servicioId
                    }
                }

            },
            { new: true }
        );

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente o servicio no encontrado'

            });
        }

        res.json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar servicio',
            error: error.message
        });
    }
};

exports.addRepuestoAServicio = async (req, res) => {
    try {
        const { repuestoId, cantidad } = req.body;
        const repuesto = await Repuesto.findById(repuestoId);

        if (!repuesto) {
            return res.status(404).json({
                message: 'Repuesto no encontrado'
            });

        }

        if (repuesto.stock < cantidad) {
            return res.status(400).json({
                message: 'Stock insuficiente'
            });
        }

        const cliente = await Cliente.findOneAndUpdate(
            {
                '_id': req.params.clienteId,
                'historialServicios._id': req.params.servicioId
            },
            {

                $push: {
                    'historialServicios.$.repuestosUtilizados': {
                        repuesto: repuestoId,
                        cantidad,
                        precio: repuesto.precio
                    }
                }
            },

            { new: true }
        );


        // Actualizar stock del repuesto
        await Repuesto.findByIdAndUpdate(repuestoId, {
            $inc: { stock: -cantidad }
        });

        res.json(cliente);
    } catch (error) {
        res.status(400).json({
            message: 'Error al añadir repuesto al servicio',
            error: error.message
        });
    }
};
