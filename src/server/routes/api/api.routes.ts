import e, { Router } from 'express'
import tipRoutes from './tip.routes.ts'

const router: Router = Router()

/// GET -> /api
router.get("/", (_: e.Request, res: e.Response): void => {
    res.status(200).send("API home. Nothing to see here.")
})

/// GET -> /api/health
router.get("/health", (_: e.Request, res: e.Response): void => {
    res.status(200).send("API ready to serve.")
})

router.use("/tip", tipRoutes)

export default router