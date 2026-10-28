import { Router } from "express";
import { deleteCategoria, getAllCategorias, getCategoriaById, postNewCategoria, putNewCategoria } from "../controllers/categoria.controller.js"

const router = Router()

router.get('/categoria', getAllCategorias)

router.get('/categoria/:id', getCategoriaById)

router.post('/categoria', postNewCategoria)

router.put('/categoria/:id', putNewCategoria)

router.delete('/categoria/:id', deleteCategoria)

export const categoriarouter = router;