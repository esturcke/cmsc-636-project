import { PropTypes as T } from "react"

const cartesian = T.shape({
  x : T.number.isRequired,
  y : T.number.isRequired,
})

const polar = T.shape({
  r : T.number.isRequired,
  t : T.number.isRequired,
})

const position = T.oneOfType([cartesian, polar])

const globalTypes = {
  className      : T.string,
  style          : T.object,
  stroke         : T.string,
  strokeOpacity  : T.number,
  strokeWidth    : T.number,
  strokeLinecap  : T.oneOf(["butt", "square", "round"]),
  strokeLinejoin : T.oneOf(["miter", "round", "bevel"]),
  strokeDash     : T.string,
  fill           : T.string,
  fillOpacity    : T.number,
  onMouseOver    : T.func,
  onMouseOut     : T.func,
  display        : T.oneOf(["inline", "none"]),
}

const host = T.shape({
  i        : T.number.isRequired,
  angle    : T.number.isRequired,
  position : position.isRequired,
  ip       : T.string.isRequired,
  name     : T.string.isRequired,
  nickname : T.string.isRequired,
  site     : T.string.isRequired,
  type     : T.oneOf(["workstation", "administrator", "server"]).isRequired,
  service  : T.oneOf(["http", "smtp", "domain"]),
})

const externalHost = T.shape({
  position : position.isRequired,
  ip       : T.string.isRequired,
})

const types = {
  cartesian,
  polar,
  position,
  globalTypes,
  host,
  externalHost,
  ...T,
}

export default types
