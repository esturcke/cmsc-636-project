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

const host = T.shape({
  i        : T.number.isRequired,
  angle    : T.number.isRequired,
  position : polar.isRequired,
  ip       : T.string.isRequired,
  name     : T.string.isRequired,
  nickname : T.string.isRequired,
  site     : T.string.isRequired,
  type     : T.oneOf(["workstation", "administrator", "server"]).isRequired,
  service  : T.oneOf(["http", "smtp", "domain"]),
})

const externalHost = T.shape({
  position : polar.isRequired,
  ip       : T.string.isRequired,
})

const types = {
  cartesian,
  polar,
  globalTypes,
  host,
  externalHost,
  ...T,
}

export default types
