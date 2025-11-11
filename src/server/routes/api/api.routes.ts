import { Router } from 'express'
import { controllers } from '../../controllers/index.controller.ts'
import tipRoutes from './tip.routes.ts'

const router: Router = Router()

/// GET -> /api 
router.get("/", controllers.api.home)

/// GET -> /api/health
router.get("/health", controllers.api.checkHealth)

router.use("/tip", tipRoutes)

export default router