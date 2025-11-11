import express, { Router } from "express"
import { PORT, ENVIRONMENT } from "./secrets.ts"
import routes from "./routes/index.routes.ts"

const app = express()

app.use("/", routes)

app.listen(PORT, () => {
    console.log(`${ENVIRONMENT} server running at http://localhost:${PORT}`)
})