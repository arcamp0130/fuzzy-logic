import e from 'express'

export const home = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Tip API. Nothing to see here."
    })
}

export const calculateTip = (req: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Calculating tip!"
    })
}

export const getRules = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Retrieving fuzzy rules!"
    })
}