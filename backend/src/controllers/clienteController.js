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

// backend/src/controllers/clienteController.js

// backend/src/controllers/clienteController.js

exports.addServicio = async (req, res) => {
    try {
        console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
        console.log('ID del cliente:', req.params.id);

        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        // Validar datos requeridos
        const {
            vehiculo,
            tipo,
            descripcion,
            estado,
            costoManoObra,
            repuestosUtilizados
        } = req.body;

        // Validaciones específicas
        if (!vehiculo) {
            return res.status(400).json({

                message: 'El vehículo es requerido'
            });
        }

        if (!tipo) {
            return res.status(400).json({
                message: 'El tipo de servicio es requerido'
            });
        }



        // Convertir el ID del vehículo a string si es ObjectId
        const vehiculoId = vehiculo.toString();

        // Verificar que el vehículo pertenezca al cliente
        const vehiculoEncontrado = cliente.vehiculos.find(v => v._id.toString() === vehiculoId);

        if (!vehiculoEncontrado) {
            console.log('Vehículos disponibles:', cliente.vehiculos.map(v => v._id.toString()));
            console.log('Vehículo buscado:', vehiculoId);
            return res.status(400).json({
                message: 'El vehículo seleccionado no pertenece a este cliente'
            });
        }

        // Calcular costos

        let costoRepuestosTotal = 0;
        if (repuestosUtilizados && repuestosUtilizados.length > 0) {

            for (const item of repuestosUtilizados) {
                const repuesto = await Repuesto.findById(item.repuesto);
                if (!repuesto) {
                    return res.status(404).json({
                        message: `Repuesto no encontrado: ${item.repuesto}`
                    });
                }
                if (repuesto.stock < item.cantidad) {
                    return res.status(400).json({
                        message: `Stock insuficiente para ${repuesto.nombre}. Disponible: ${repuesto.stock}`
                    });
                }

                costoRepuestosTotal += (repuesto.precio * item.cantidad);

                // Actualizar stock
                await Repuesto.findByIdAndUpdate(item.repuesto, {

                    $inc: { stock: -item.cantidad }
                });
            }
        }

        const total = Number(costoManoObra) + costoRepuestosTotal;

        const servicio = {
            fecha: new Date(),
            vehiculo: vehiculoId,
            tipo,
            descripcion,
            kilometraje: req.body.kilometraje || 0,
            diagnostico: req.body.diagnostico || '',
            estado: estado || 'Pendiente',
            trabajosRealizados: (req.body.trabajosRealizados || []).filter(t => t.trim() !== ''),
            repuestosUtilizados: repuestosUtilizados || [],
            costoManoObra: Number(costoManoObra) || 0,
            costoRepuestos: costoRepuestosTotal,
            total,
            observaciones: req.body.observaciones || '',
            fechaEntrega: req.body.fechaEntrega ? new Date(req.body.fechaEntrega) : null,
            tecnico: req.user._id
        };

        console.log('Servicio a guardar:', JSON.stringify(servicio, null, 2));


        cliente.historialServicios.push(servicio);
        await cliente.save();


        // Populate los datos del servicio agregado
        const servicioAgregado = cliente.historialServicios[cliente.historialServicios.length - 1];

        await cliente.populate([
            {
                path: 'historialServicios.repuestosUtilizados.repuesto',
                select: 'nombre codigo precio'
            },

            {
                path: 'historialServicios.tecnico',
                select: 'nombre'
            }
        ]);


        res.status(201).json(servicioAgregado);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(400).json({

            message: 'Error al añadir servicio',
            error: error.message,
            details: error.stack
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
