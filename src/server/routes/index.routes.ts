import { Router } from 'express'
import { controllers } from '../controllers/index.controller.ts'
import apiRoutes from './api/api.routes.ts'

const router: Router = Router()

/// GET -> /
router.get("/", controllers.home)

router.use("/api", apiRoutes)

export default router