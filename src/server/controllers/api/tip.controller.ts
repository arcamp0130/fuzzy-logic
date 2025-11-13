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
    const { foodQuality, serviceQuality, maxTipPercentage } = req.body

    // Allow zero values — check for null/undefined instead of falsy check
    if (foodQuality == null || serviceQuality == null || maxTipPercentage == null) {
        res.status(400).json({
            status: "failure",
            error: "Missing data",
            message: "One or more quantifiers are missing"
        })
        return
    }

    const food: number = parseFloat(String(foodQuality))
    const service: number = parseFloat(String(serviceQuality))
    const maxTip: number = parseFloat(String(maxTipPercentage))

    if (isNaN(food) || isNaN(service) || isNaN(maxTip)) {
        res.status(400).json({
            status: "failure",
            error: "Invalid input",
            message: "Provided data must be numeric"
        })
        return
    }

    if (food < 0 || food > 10 ||
        service < 0 || service > 10 ||
        maxTip < 0 || maxTip > 100) {
        res.status(400).json({
            status: "failure",
            error: "Out of range",
            message: "'Food' and 'Service' quality must be a 0-10 value, and 'Max tip' a 1-100 (%) value",
        })
        return
    }

    try {
        const result = fuzzyTip.calculate(food, service, maxTip)
        res.status(200).json({
            status: "success",
            message: "Fuzzy inference completed.",
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