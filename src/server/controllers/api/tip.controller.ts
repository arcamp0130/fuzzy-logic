import e from 'express'
import { FuzzyTip } from '../../services/fuzzy.service.ts'
const fuzzyTip: FuzzyTip = new FuzzyTip()

export const home = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Tip API. Nothing to see here."
    })
}

export const calculateTip = (req: e.Request, res: e.Response): void => {
    const result = fuzzyTip.calculate()
    res.status(200).json({
        message: "Calculating tip!",
        tip: result
    })
}

export const getRules = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Retrieving fuzzy rules!"
    })
}