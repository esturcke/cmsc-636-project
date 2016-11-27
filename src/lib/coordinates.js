import { has } from "lodash"

const origin = { x : 0, y : 0 }

const isPolar     = value => has(value, "r") && has(value, "t")
const isCartesian = value => has(value, "x") && has(value, "y")

const cartesianFromPolar = ({ r, t }) => ({
  x : r * Math.cos(t),
  y : r * Math.sin(t),
})

const polarFromCartesian = ({ x, y }) => ({
  r : Math.sqrt(x * x + y * y),
  t : Math.atan2(y, x),
})

const polar = value => {
  if (isCartesian(value)) return polarFromCartesian(value)
  if (isPolar(value))     return value
  throw new Error("This does not look like a coordinate:", value)
}

const cartesian = value => {
  if (isPolar(value))     return cartesianFromPolar(value)
  if (isCartesian(value)) return value
  throw new Error("This does not look like a coordinate:", value)
}

const cartesianDifference = (a, b) => ({ x : a.x - b.x, y : a.y - b.y })
const difference          = (a, b) => cartesianDifference(cartesian(a), cartesian(b))

const cartesianMagnitude = ({ x, y }) => Math.sqrt(x * x + y * y)
const magnitude          = p => cartesianMagnitude(cartesian(p))
const distance           = (from, to = origin) => magnitude(difference(from, to))

export {
  polar,
  cartesian,
  magnitude,
  distance,
  difference,
}
