const rateLimit = require('express-rate-limit');

// Limita a 100 request por IP cada 15min
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Demasiadas solicitudes, intentá de nuevo en 15 minutos' },
  standardHeaders: true,
  legacyHeaders: false,
});

// limita a 10 request de inicio de sesion/Registro cada 15min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Demasiados intentos, intentá de nuevo en 15 minutos' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { globalLimiter, authLimiter };