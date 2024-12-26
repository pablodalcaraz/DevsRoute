import { Router } from "express";
import { verificarSesion, cerrarSesion,login} from "../controllers/authController.js";

const router = Router()


router.post('/login', login)
router.get('/session', verificarSesion)
router.get('/logout', cerrarSesion)


export default router