const { body, validationResult } = require('express-validator');

const ALLOWED_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.com.ar', 'yahoo.com.br', 'yahoo.es',
  'outlook.com', 'outlook.com.ar', 'outlook.es',
  'hotmail.com', 'hotmail.com.ar', 'hotmail.es',
  'live.com', 'live.com.ar',
  'icloud.com', 'me.com', 'mac.com',
  'proton.me', 'protonmail.com',
  'tutanota.com', 'tuta.io',
  'zoho.com',
  'aol.com',
  'msn.com',
  'mail.com',
]);

const isAllowedEmailDomain = (email) => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1].toLowerCase();
  return ALLOWED_DOMAINS.has(domain) ||
    [...ALLOWED_DOMAINS].some(d => domain.endsWith('.' + d));
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
    .isLength({ max: 50 }).withMessage('El nombre no puede superar 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),

  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail()
    .custom((value) => {
      if (!isAllowedEmailDomain(value)) {
        throw new Error('Solo se aceptan emails de proveedores conocidos (Gmail, Outlook, Yahoo, etc.)');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),

  body('confirmPassword')
    .notEmpty().withMessage('La confirmación de contraseña es obligatoria')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),

  handleValidationErrors,
];

const validateLogin = [
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),

  handleValidationErrors,
];

module.exports = { validateRegister, validateLogin };