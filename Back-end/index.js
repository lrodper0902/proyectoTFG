const express = require('express');
const getConnection = require('./database/connect'); 
const cors = require('cors');
require('dotenv').config();
const { insertAdmin } = require('./controller/Admin');

// Crear servidor node
const app = express();
const PORT = 3000;

// Conexion a la base de datos
getConnection();

// Configurar cors
app.use(cors({
    origin: '*', // Permite todas las solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Convertir los datos del body a JSON
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));

insertAdmin();

// Cargar conf rutas
const ClienteRoutes = require("./routes/cliente");
const ReservaRoutes = require("./routes/reserva");
const MesaRoutes = require("./routes/mesa");
const SalasRoutes = require("./routes/salas");
const emailRoutes = require('./routes/email');

app.use("/api", ClienteRoutes);
app.use("/api", ReservaRoutes);
app.use("/api", MesaRoutes);
app.use("/api", SalasRoutes);
app.use('/api', emailRoutes);

// Poner servidor a escuchar peticiones http
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
