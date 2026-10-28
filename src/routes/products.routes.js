import { Router } from "express";
import { deleteProduct, getAllPruducts, getProductById, postNewProduct, putNewProduct } from "../controllers/productos.controller.js";

const router = Router()

router.get('/products', getAllPruducts);

router.get('/products/:id', getProductById);

router.post('/products', postNewProduct);

router.put('/products/:id', putNewProduct);

router.delete('/products/:id', deleteProduct);

export const productsRouter = router;