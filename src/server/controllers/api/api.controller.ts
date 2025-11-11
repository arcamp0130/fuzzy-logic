import e from 'express'
import * as tip from './tip.controller.ts'

const checkHealth = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        status: "OK",
        message: "API ready to serve.",
        timeStamp: new Date().toLocaleString()
    })
}

const home = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "API home. Nothing to see here."
    })
}

export const api = {
    tip,
    home,
    checkHealth
}