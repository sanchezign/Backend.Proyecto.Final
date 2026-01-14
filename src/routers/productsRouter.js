import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const pm = ProductManager.getInstance();

router.get('/', async (req, res) => {
  try {
    const result = await pm.getProducts(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const producto = await pm.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pm.delete(req.params.id);
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;