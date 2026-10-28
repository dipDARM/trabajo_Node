import { Router } from "express";
import { deleteCliente, getAllClientes, getClienteById, postNewCliente, putNewCliente } from "../controllers/clientes.controller.js";

const router = Router();

router.get("/cliente", getAllClientes);

router.get("/cliente/:id", getClienteById);

router.post("/cliente", postNewCliente);

router.put("/cliente/:id", putNewCliente)

router.delete("/cliente/:id", deleteCliente)

export const clienteroutes = router;