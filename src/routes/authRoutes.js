const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');
const { authLimiter } = require('../middlewares/rateLimitMiddleware');

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);

module.exports = router;