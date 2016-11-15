import { has } from "lodash"

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

export {
  polar,
  cartesian,
}
