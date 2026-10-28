import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import { clienteroutes } from './routes/cliente.routes.js';
import { categoriarouter } from './routes/categoria.routes.js';


const app = express();

app.use(express.json())

app.use(productsRouter, clienteroutes, categoriarouter)

const PORT = process.env.PORT

app.listen(PORT,
    console.log(`servidor corriendo en puerto ${PORT}`)
)