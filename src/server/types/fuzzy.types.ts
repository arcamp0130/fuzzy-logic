import { Shape } from "es6-fuzz/lib/curve/shape.js"
import { Sigmoid } from "es6-fuzz/lib/curve/sigmoid.js"
import { Constant } from "es6-fuzz/lib/curve/constant.js"

export type Quality = 'poor' | 'avrg' | 'high'

export type MembershipFunc = Shape | Constant | Sigmoid

export interface FuzzyRule {
    id: number
    food: Quality,
    service: Quality,
    tip: Quality,
    description: string
}