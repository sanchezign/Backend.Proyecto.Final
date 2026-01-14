# Backend Proyecto Final.

Proyecto final del curso **Programación Backend I: Desarrollo Avanzado de Backend**. 
Implementación completa de una API de productos y carritos con persistencia en **MongoDB Atlas**, paginación profesional, ordenamiento, filtros, vistas Handlebars y gestión completa de carritos.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)  
![Express](https://img.shields.io/badge/Express-4.18-blue)  
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)  
![Mongoose](https://img.shields.io/badge/Mongoose-8.0-orange)  
![Handlebars](https://img.shields.io/badge/Handlebars-7.1-orange)

Tecnologías principales

    Node.js + Express
    MongoDB Atlas + Mongoose (populate, lean, paginate-v2)
    express-handlebars (vistas)
    dotenv (variables de entorno)
    Socket.IO (preparado para real-time)

## Objetivos cumplidos. ✓

- Persistencia principal en **MongoDB Atlas** (productos y carritos)
- Endpoints completos para productos y carritos (GET, POST, PUT, DELETE)
- **Paginación, ordenamiento y filtros** en GET /api/products (limit, page, sort, query)
- Formato de respuesta profesional: status, payload, totalPages, prevLink, nextLink, etc.
- Gestión avanzada de carritos: agregar/eliminar/actualizar cantidades/productos, vaciar carrito
- **Populate** en carritos para traer productos completos
- Vistas Handlebars:
  - `/` → página de bienvenida
  - `/products` → lista paginada con botones "Ver detalle" y "Agregar al carrito"
  - `/products/:pid` → detalle de producto
  - `/carts/:cid` → vista del carrito específico
- Uso de `.lean()` para rendimiento en vistas
- Código modular, limpio y escalable (routers, managers, models)
- Validaciones en managers + manejo de errores

## Estructura de carpetas

```text
Backend.Proyecto.Final/
├── package.json
├── .gitignore
├── .env.example               
├── README.md
└── src/
    ├── app.js                 # Servidor principal + conexión Mongo + rutas vistas
    ├── managers/              # Lógica de negocio (ProductManager y CartManager)
    │   ├── ProductManager.js
    │   └── CartManager.js
    ├── models/                # Esquemas Mongoose
    │   ├── Product.js
    │   └── Cart.js
    ├── routers/               # Rutas API separadas
    │   ├── productsRouter.js
    │   └── cartsRouter.js
    └── views/                 # Plantillas Handlebars
        ├── layouts/
        │   └── main.handlebars
        ├── home.handlebars
        ├── products.handlebars
        ├── productDetail.handlebars
        └── cart.handlebars 
```
## Instalación. (paso a paso)

1. **Clonar el repositorio.**  
   ```bash
   git clone https://github.com/tu-usuario/backend-proyecto-final.git
   cd backend-proyecto-final

2. **Instalar dependencias.** 

       npm install

4. **Crear archivo .env en la raíz del proyecto.** 
 
       Crea un archivo llamado .env y pega tu cadena de conexión de MongoDB Atlas.

5. **Iniciar el servidor.** 
 
       npm start

6. **Abrir en el navegador.**
 
       Página principal: http://localhost:8080

7. **Endpoints clave.**
  
  Productos:

   GET /api/products :
   
    Lista productos con paginación, ordenamiento y filtros.

   POST /api/products :
    
    Crea un producto nuevo.

  Parámetros:
  
    limit → cantidad por página (default: 10)
    page → número de página (default: 1)
    sort → asc / desc por precio (default: sin orden)
    query → filtro JSON (ej: {"category":"electronics"} o {"status":true}) 

   Carritos

    POST /api/carts
    Crea un carrito vacío → devuelve el nuevo carrito con _id.
    GET /api/carts
    Lista todos los carritos (con populate de productos).
    GET /api/carts/:cid
    Obtiene un carrito específico (con populate).
    POST /api/carts/:cid/products/:pid
    Agrega un producto al carrito.
    DELETE /api/carts/:cid/products/:pid
    Elimina un producto del carrito.
    PUT /api/carts/:cid
    Actualiza todos los productos del carrito.
    PUT /api/carts/:cid/products/:pid
    Actualiza cantidad de un producto específico.
    DELETE /api/carts/:cid
    Vacía el carrito. 

   Vistas Handlebars

    GET / → Página de bienvenida
    GET /products → Lista paginada de productos
    GET /products/:pid → Detalle de producto
    GET /carts/:cid → Vista del carrito

    

  





