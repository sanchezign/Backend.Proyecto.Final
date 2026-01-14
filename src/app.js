import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import ProductManager from './managers/ProductManager.js';
import CartManager from './managers/CartManager.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.error('Error Mongo:', err));

app.engine('handlebars', engine({
  strict: false  
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const pm = ProductManager.getInstance();
const cm = CartManager.getInstance();

// RUTAS DE VISTAS
app.get('/products', async (req, res) => {
  const result = await pm.getProducts(req.query);
  res.render('products', { ...result, title: "Productos con Paginación" });
});

app.get('/products/:pid', async (req, res) => {
  try {
    const product = await pm.getById(req.params.pid);
    res.render('productDetail', { product, title: product.title });
  } catch (error) {
    res.status(404).send('Producto no encontrado');
  }
});

app.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cm.getById(req.params.cid);
    res.render('cart', { products: cart.products, title: "Carrito" });
  } catch (error) {
    res.status(404).send('Carrito no encontrado');
  }
});

// NUEVA RUTA RAÍZ 
app.get('/', (req, res) => {
  // Renderiza la nueva vista home.handlebars con título
  res.render('home', { title: "Bienvenido al Proyecto Final" });
});

// SERVIDOR + SOCKET.IO 
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
});