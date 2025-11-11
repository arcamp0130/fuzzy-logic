import e, { Router } from 'express'
import apiRoutes from './api/api.routes.ts'

const router: Router = Router()

/// GET -> /
router.get("/", (_: e.Request, res: e.Response) => {
    res.status(200).send("Hello from Express and TS!")
})

router.use("/api", apiRoutes)

export default router