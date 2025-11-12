import { MembershipFunc, Quality } from "../types/fuzzy.types.ts"
import shapes from "../components/fuzzy.shapes.ts"

export class FuzzyTip {
    private static foodMemberships: Record<Quality, MembershipFunc>
    private static serviceMemberships: Record<Quality, MembershipFunc>
    private static tipMemberships: Record<Quality, MembershipFunc>

    constructor() {
        FuzzyTip.foodMemberships = { // Empty
            poor: new shapes.Triangle(0, 0, 0, 0),
            avrg: new shapes.Trapezoid(0, 0, 0, 0),
            high: new shapes.Sigmoid(0, 0),
        }
        FuzzyTip.serviceMemberships = { //Empty
            poor: new shapes.Triangle(0, 0, 0, 0),
            avrg: new shapes.Trapezoid(0, 0, 0, 0),
            high: new shapes.Sigmoid(0, 0)
        }
        FuzzyTip.tipMemberships = { //Empty
            poor: new shapes.Triangle(0, 0, 0, 0),
            avrg: new shapes.Trapezoid(0, 0, 0, 0),
            high: new shapes.Sigmoid(0, 0)
        }
        
    }

    public calculate (): number {
        let percentage = 15.7 // Mock

        return percentage
    }
}