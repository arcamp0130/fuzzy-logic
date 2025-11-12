import type { FuzzyRule, MembershipFunc, Quality } from "../types/fuzzy.types.ts"
import shapes from "../components/fuzzy.shapes.ts"

export class FuzzyTip {
    private static foodMemberships: Record<Quality, MembershipFunc>
    private static serviceMemberships: Record<Quality, MembershipFunc>
    private static tipMemberships: Record<Quality, MembershipFunc>
    private static rules: Array<FuzzyRule> = []

    constructor() {
        FuzzyTip.foodMemberships = { // Empty
            poor: new shapes.Trapezoid(0, 0, 1.5, 4),
            avrg: new shapes.Trapezoid(2.5, 4, 7, 8.5),
            high: new shapes.Sigmoid(8.75, 1.25),
        }
        FuzzyTip.serviceMemberships = { //Empty
            poor: new shapes.Trapezoid(0, 0, 3.5, 5.5),
            avrg: new shapes.Trapezoid(4, 5.5, 8, 9),
            high: new shapes.Sigmoid(9, 1)
        }
        FuzzyTip.tipMemberships = { //Empty
            poor: new shapes.Trapezoid(0, 0, 1, 2.5),
            avrg: new shapes.Trapezoid(0, 0, 0, 0),
            high: new shapes.Sigmoid(8.75, 1.25),
        }

        FuzzyTip.rules = [
            { food: 'poor', service: 'poor', tip: 'poor', description: 'Poor food and poor service → poor tip' },
            { food: 'poor', service: 'avrg', tip: 'poor', description: 'Poor food and average service → poor tip' },
            { food: 'poor', service: 'high', tip: 'avrg', description: 'Poor food but high service → avrg tip' },
            { food: 'avrg', service: 'poor', tip: 'poor', description: 'Average food and poor service → poor tip' },
            { food: 'avrg', service: 'avrg', tip: 'avrg', description: 'Average food and average service → avrg tip' },
            { food: 'avrg', service: 'high', tip: 'avrg', description: 'Average food and high service → avrg tip' },
            { food: 'high', service: 'poor', tip: 'poor', description: 'high food but poor service → poor tip' },
            { food: 'high', service: 'avrg', tip: 'avrg', description: 'high food and average service → avrg tip' },
            { food: 'high', service: 'high', tip: 'high', description: 'high food and high service → high tip' }
        ]
    }

    public calculate(): number {
        let percentage = 15.7 // Mock

        return percentage
    }
}