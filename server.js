const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./src/config/db');
const passport = require('./src/config/passport');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { errorHandler, notFound } = require('./src/middlewares/errorMiddleware');
const { globalLimiter } = require('./src/middlewares/rateLimitMiddleware');
const swaggerSpec = require('./src/config/swagger');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3001',
  credentials: true,
};

const app = express();

// Middlewares globales
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(globalLimiter);

// Sesión y Passport
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Swagger para documentacion
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.get('/', (req, res) => res.json({ message: 'Auth API funcionando', version: '1.0.0' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

module.exports = app;