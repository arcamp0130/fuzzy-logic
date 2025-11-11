import express from "express"
import cors from "cors"
import { PORT, ENVIRONMENT } from "./secrets.ts"
import routes from "./routes/index.routes.ts"

const app = express()

app.use(cors()) // Allowing requests from frontend at any domain
app.use(express.json()) // Allowing json-formatted bodies
app.use(express.urlencoded()) // Parsing from URL options to JSON
app.use("/", routes)

app.listen(PORT, () => {
    console.log(`${ENVIRONMENT} server running at http://localhost:${PORT}`)
})