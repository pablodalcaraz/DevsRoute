import { Router } from "express";
import { mostrarEquivalencias } from "../controllers/equivalenciasController.js";

const router = Router()

router.get('/equivalencias',mostrarEquivalencias)

export default router