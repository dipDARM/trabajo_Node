import { Router } from "express";
import { deleteProduct, getAllPruducts, getProductById, postNewProduct, putNewProduct } from "../controllers/productos.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/products', getAllPruducts);

router.get('/products/:id', getProductById);



router.post('/products', verifyToken, postNewProduct);

router.put('/products/:id', verifyToken, putNewProduct);

router.delete('/products/:id', verifyToken, deleteProduct);

export const productsRouter = router;