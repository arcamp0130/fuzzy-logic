import express, { Router } from "express"

// TODO: import from .env
const PORT = 3030 
const ENVIRONMENT =  "development"
// end TODO

const app = express()
const router = Router()

router.get("/", (_: express.Request, res: express.Response) => {
    res.send("Hello from Express and TS!")
})
app.use("/", router)

app.listen(PORT, () => {
    console.log(`${ENVIRONMENT} server running at http://localhost:${PORT}`)
})