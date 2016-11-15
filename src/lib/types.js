import { PropTypes as T } from "react"

const cartesian = T.shape({
  x : T.number.isRequired,
  y : T.number.isRequired,
})

const polar = T.shape({
  r : T.number.isRequired,
  t : T.number.isRequired,
})

const globalTypes = {
  className      : T.string,
  style          : T.object,
  stroke         : T.string,
  strokeOpacity  : T.number,
  strokeWidth    : T.number,
  strokeLinecap  : T.oneOf(["butt", "square", "round"]),
  strokeLinejoin : T.oneOf(["miter", "round", "bevel"]),
  strokeLash     : T.string,
  fill           : T.string,
  fillOpacity    : T.number,
}

const types = {
  cartesian,
  polar,
  globalTypes,
  ...T,
}

export default types
