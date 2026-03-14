const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { errorHandler, notFound } = require('./src/middlewares/errorMiddleware');
const { globalLimiter } = require('./src/middlewares/rateLimitMiddleware');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(globalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'Auth API funcionando', version: '1.0.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));