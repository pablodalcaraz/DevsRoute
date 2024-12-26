import { Router } from "express";
import { mostrarMateriasPorPlan } from "../controllers/miCarreraController.js";

const router = Router()

router.get('/mi-carrera', mostrarMateriasPorPlan)

export default router