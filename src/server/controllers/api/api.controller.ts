import e from 'express'
import * as tip from './tip.controller.ts'

const checkHealth = (_: e.Request, res: e.Response): void => {
    res.status(200).send("API ready to serve.")
}

const home = (_: e.Request, res: e.Response): void => {
    res.status(200).send("API home. Nothing to see here.")
}

export const api = {
    tip,
    home,
    checkHealth
}