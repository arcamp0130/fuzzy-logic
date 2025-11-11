import { config } from "dotenv"
config()

export const PORT           =   process.env.SERVER_PORT     || 8080
export const ENVIRONMENT    =   process.env.NODE_ENV        || "development"
export const TZ             =   process.env.TZ              || "America/Mexico_City"