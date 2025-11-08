import express from "express"

// TODO: import from .env
const PORT = 3030 
const ENVIRONMENT =  "development"
// end TODO

const app = express()

app.listen(PORT, () => {
    console.log(`${ENVIRONMENT} server running at http://localhost:${PORT}`)
})