const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user });
});

/**
 * @swagger
 * /api/users/admin:
 *   get:
 *     summary: Panel de administración
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso concedido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso restringido a administradores
 */
router.get('/admin', protect, adminOnly, async (req, res) => {
  res.json({ message: 'Bienvenido al panel de administración' });
});

module.exports = router;