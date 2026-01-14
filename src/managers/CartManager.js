import Cart from '../models/Cart.js';

export default class CartManager {
  static #instance;

  static getInstance() {
    if (!this.#instance) this.#instance = new CartManager();
    return this.#instance;
  }

  async create() {
    const nuevo = new Cart({ products: [] });
    return await nuevo.save();
  }

  async getById(id) {
    return await Cart.findById(id).populate('products.product').lean();
  }

  // Para listar todos los carritos
  async getAll() {
    return await Cart.find().populate('products.product').lean();  // Trae todos con populate y lean
  }

  async addProduct(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const index = cart.products.findIndex(p => p.product.toString() === pid);
    if (index !== -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    return await cart.save();
  }

  async removeProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    return await cart.save();
  }

  async updateProducts(cid, productsArray) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = productsArray.map(p => ({
      product: p.product,
      quantity: p.quantity || 1
    }));

    return await cart.save();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const index = cart.products.findIndex(p => p.product.toString() === pid);
    if (index === -1) throw new Error('Producto no encontrado en carrito');

    cart.products[index].quantity = Number(quantity);
    return await cart.save();
  }

  async clear(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = [];
    return await cart.save();
  }
}
