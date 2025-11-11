import { Router } from 'express'
import { controllers } from '../../controllers/index.controller.ts'

const router: Router = Router()

/// GET -> /api/tip
router.get("/", controllers.api.tip.home)

/// POST -> /api/tip/calculate
router.post("/calculate", controllers.api.tip.calculateTip)

/// GET -> /api/tip/rules
router.get("/rules", controllers.api.tip.getRules)

export default router