import e, { Router } from 'express'

const router: Router = Router()

/// GET -> /api/tip
router.get("/", (_: e.Request, res: e.Response): void => {
    res.status(200).send("Tip API. Nothing to see here.")
})

/// POST -> /api/tip/calculate
router.post("/calculate", (req: e.Request, res: e.Response): void => {
    res.status(200).send("Calculating tip!")
})

/// GET -> /api/tip/rules
router.get("/rules", (_: e.Request, res: e.Response): void => {
    res.status(200).send("Retrieving fuzzy rules!")
})

export default router