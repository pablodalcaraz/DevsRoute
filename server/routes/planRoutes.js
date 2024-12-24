import { Router } from "express";
import { mostrarPlan, mostrarMaterias } from "../controllers/planController.js";

const router = Router()

router.get('/planes', mostrarPlan)
router.get('/materias', mostrarMaterias)

export default router