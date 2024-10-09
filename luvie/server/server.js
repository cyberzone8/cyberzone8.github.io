const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');  // Importa mongoose
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Cargar las variables de entorno
dotenv.config();  // Carga las variables de entorno

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());

// Rutas de usuario
app.use('/api/users', userRoutes);

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
    try {
        // Lista todas las colecciones en la base de datos
        const result = await mongoose.connection.db.listCollections().toArray();
        res.json(result);  // Devuelve la lista de colecciones
    } catch (error) {
        res.status(500).json({ message: 'Database connection error' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
