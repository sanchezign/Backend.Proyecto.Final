import Product from '../models/Product.js';

export default class ProductManager {
  static #instance;

  static getInstance() {
    if (!this.#instance) this.#instance = new ProductManager();
    return this.#instance;
  }

  async getProducts(queryOptions = {}) {
    const { limit = 10, page = 1, sort, query } = queryOptions;

    const filter = {};
    if (query) {
      if (query.category) filter.category = query.category;
      if (query.status !== undefined) filter.status = query.status;
    }

    const options = {
      limit: Number(limit),
      page: Number(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      lean: true  // ← Convierte a POJO para Handlebars
    };

    const result = await Product.paginate(filter, options);

    return {
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${JSON.stringify(query)}` : ''}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${JSON.stringify(query)}` : ''}` : null
    };
  }

  async create(productoRaw) {
    const required = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const campo of required) {
      if (!productoRaw[campo] || productoRaw[campo].toString().trim() === '') {
        throw new Error(`El campo ${campo} es obligatorio`);
      }
    }

    const nuevo = new Product({
      title: productoRaw.title.trim(),
      description: productoRaw.description.trim(),
      code: productoRaw.code.trim(),
      price: Number(productoRaw.price),
      stock: Number(productoRaw.stock),
      category: productoRaw.category.trim(),
      thumbnails: productoRaw.thumbnails || []
    });

    return await nuevo.save();
  }

  async getById(id) {
    return await Product.findById(id).lean();  // ←Convierte a POJO para vistas
  }

  async delete(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    await Product.findByIdAndDelete(id);
    return true;
  }
}