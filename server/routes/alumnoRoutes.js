import { Router } from "express"
import { updatePlan } from "../controllers/alumnoController.js"

const router = Router()

router.put('/update-plan', updatePlan)

export default router