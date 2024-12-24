import express from "express";
import { agregarMateria,borrarMateria, verMateriasAprobadas } from "../controllers/aprobadasController.js";

const router = express.Router();

router.post("/guardar-materias", agregarMateria);
router.post("/borrar-materias", borrarMateria);
router.get("/ver-aprobadas", verMateriasAprobadas);

export default router;
