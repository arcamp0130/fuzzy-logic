import e from 'express'
import { api } from './api/api.controller.ts'

const home = (_: e.Request, res: e.Response) => {
    res.status(200).send("Hello from Express and TS!")
}

export const controllers = {
    api,
    home
}