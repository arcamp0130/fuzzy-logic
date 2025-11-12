import e from 'express'
import { FuzzyTip } from '../../services/fuzzy.service.ts'
const fuzzyTip: FuzzyTip = new FuzzyTip()

export const home = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Tip API. Nothing to see here."
    })
}

export const calculateTip = (req: e.Request, res: e.Response): void => {
    if (!req.body) {
        res.status(400).json({
            status: "failure",
            message: "No body provided"
        })
        return
    }

    const { foodQuality, serviceQuality } = req.body

    if (!foodQuality || !serviceQuality) {
        res.status(400).json({
            status: "failure",
            error: "Missing data",
            message: "One or more quantifiers are missing"
        })
        return
    }

    const food: number = parseFloat(foodQuality)
    const service: number = parseFloat(serviceQuality)

    if (isNaN(food) || isNaN(food)) {
        res.status(400).json({
            status: "failure",
            error: "Invalid input",
            message: "Provided data must be numeric"
        })
    }

    if (food < 0 || food > 10 || service < 0 || service > 10) {
        res.status(400).json({
            status: "failure",
            error: "Out of range",
            message: "Both values must be between 0 and 10",
        })
        return
    }

    try {
        const result = fuzzyTip.calculate(foodQuality, serviceQuality)
        res.status(200).json({
            status: "success",
            message: "Calculating tip!",
            tip: result
        })
    } catch (error: any) {
        res.status(500).json({
            status: "failure",
            error: "Something went wrong!",
            message: error.message,
        })
    }
}

export const getRules = (_: e.Request, res: e.Response): void => {
    res.status(200).json({
        message: "Retrieving fuzzy rules!"
    })
}