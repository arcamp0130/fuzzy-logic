import { Shape } from "es6-fuzz/lib/curve/shape"
import { Sigmoid } from "es6-fuzz/lib/curve/sigmoid"
import { Constant } from "es6-fuzz/lib/curve/constant"

export type Quality = 'poor' | 'avrg' | 'high'

export type MembershipFunc = Shape | Constant | Sigmoid
