// backend/src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const repuestoRoutes = require('./routes/repuestoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const setupRoutes = require('./routes/setupRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes')
const clienteRoutes = require('./routes/clienteRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/repuestos', repuestoRoutes);
app.use('/api/ventas', ventaRoutes);  // <-- Añadido
app.use('/api/setup', setupRoutes);
app.use('/api/categorias', categoriaRoutes)
app.use('/api/clientes', clienteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
