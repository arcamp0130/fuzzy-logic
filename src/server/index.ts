import express, { Router } from "express"
import { PORT, ENVIRONMENT } from "./secrets.ts"

const app = express()
const router = Router()

router.get("/", (_: express.Request, res: express.Response) => {
    res.send("Hello from Express and TS!")
})
app.use("/", router)

app.listen(PORT, () => {
    console.log(`${ENVIRONMENT} server running at http://localhost:${PORT}`)
})