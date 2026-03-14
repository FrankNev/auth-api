const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Ruta accesible por cualquier usuario autenticado
router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user });
});

// Ruta accesible solo por admins
router.get('/admin', protect, adminOnly, async (req, res) => {
  res.json({ message: 'Bienvenido al panel de administración' });
});

module.exports = router;