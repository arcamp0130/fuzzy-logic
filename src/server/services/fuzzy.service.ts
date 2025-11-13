import type { FuzzyRule, MembershipFunc, Quality } from "../types/fuzzy.types.ts"
import shapes from "../components/fuzzy.shapes.ts"
import { Logic } from "es6-fuzz"
import type { Shape } from "es6-fuzz/lib/curve/shape"

export class FuzzyTip {
    private static foodMemberships: Record<Quality, MembershipFunc>
    private static serviceMemberships: Record<Quality, MembershipFunc>
    private static tipMemberships: Record<Quality, MembershipFunc>
    private static rules: Array<FuzzyRule> = []

    constructor() {
        FuzzyTip.foodMemberships = {
            poor: new shapes.Trapezoid(-0.1, 0, 1.5, 4),
            avrg: new shapes.Trapezoid(2.5, 4, 7, 8.5),
            high: new shapes.Trapezoid(7.5, 8.5, 10, 10.1),
        }
        FuzzyTip.serviceMemberships = {
            poor: new shapes.Trapezoid(-0.1, 0, 3.5, 5.5),
            avrg: new shapes.Trapezoid(4, 5.5, 8, 9),
            high: new shapes.Trapezoid(8, 9, 10, 10.1),
        }
        FuzzyTip.tipMemberships = {
            poor: new shapes.Constant(0),
            avrg: new shapes.Constant(5),
            high: new shapes.Constant(10),
        }

        FuzzyTip.rules = [
            { id: 0, food: 'poor', service: 'poor', tip: 'poor', description: 'Poor food and poor service → poor tip' },
            { id: 1, food: 'poor', service: 'avrg', tip: 'poor', description: 'Poor food and average service → poor tip' },
            { id: 2, food: 'poor', service: 'high', tip: 'avrg', description: 'Poor food but high service → avrg tip' },
            { id: 3, food: 'avrg', service: 'poor', tip: 'poor', description: 'Average food and poor service → poor tip' },
            { id: 4, food: 'avrg', service: 'avrg', tip: 'avrg', description: 'Average food and average service → avrg tip' },
            { id: 5, food: 'avrg', service: 'high', tip: 'avrg', description: 'Average food and high service → avrg tip' },
            { id: 6, food: 'high', service: 'poor', tip: 'poor', description: 'high food but poor service → poor tip' },
            { id: 7, food: 'high', service: 'avrg', tip: 'avrg', description: 'high food and average service → avrg tip' },
            { id: 8, food: 'high', service: 'high', tip: 'high', description: 'high food and high service → high tip' }
        ]
    }

    public calculate(foodQuality: number, serviceQuality: number): number {
        let percentage = 15.7 // Mock

        // Using sugeno model to apply fuzzy implication

        const fuzzyFood: Record<Quality, number> = {
            poor: FuzzyTip.foodMemberships.poor.fuzzify(foodQuality),
            avrg: FuzzyTip.foodMemberships.avrg.fuzzify(foodQuality),
            high: FuzzyTip.foodMemberships.high.fuzzify(foodQuality)
        }

        const fuzzyService: Record<Quality, number> = {
            poor: FuzzyTip.serviceMemberships.poor.fuzzify(serviceQuality),
            avrg: FuzzyTip.serviceMemberships.avrg.fuzzify(serviceQuality),
            high: FuzzyTip.serviceMemberships.high.fuzzify(serviceQuality)
        }

        const fuzzyAntecedent = FuzzyTip.rules.map((rule) => {
            return {
                tip: rule.tip,
                value: Math.min(
                    fuzzyFood[rule.food],
                    fuzzyService[rule.service],
                )
            }
        })

        const fuzzyConsequent: Array<number> = fuzzyAntecedent.map((rule) =>
            // Using 0 at fuzzify since argument value actually doesn't matter
            FuzzyTip.tipMemberships[rule.tip].fuzzify(0) * rule.value
        )

        const antecedentSum: number = fuzzyAntecedent.map((index) => index.value)
            .reduce((acumulator, currrent) => acumulator + currrent)

        const consequentSum: number = fuzzyConsequent
            .reduce((acumulator, currrent) => acumulator + currrent)

        const defuzzed: number = (consequentSum / antecedentSum)

        console.debug(defuzzed)

        return percentage
    }
}