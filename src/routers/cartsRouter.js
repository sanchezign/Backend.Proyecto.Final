import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cm = CartManager.getInstance();

// Ruta GET /api/carts → lista todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cm.getAll();  
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resto de rutas 
router.post('/', async (req, res) => {
  try {
    const cart = await cm.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// ... resto de rutas (post /:cid/products/:pid, delete, put, etc.) ...


export default router;