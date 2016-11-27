import React     from "react"
import Path      from "./Path"
import { polar } from "~/lib/coordinates"
import path      from "~/lib/svg/path"
import T         from "~/lib/types"

const d = ({ position, width, angle }) => {
  const p = [
    { r : position.r,         t : position.t + angle / 2 },
    { r : position.r,         t : position.t - angle / 2 },
    { r : position.r + width, t : position.t - angle / 2 },
    { r : position.r + width, t : position.t + angle / 2 },
  ]
  const radius   = position.r
  const largeArc = angle > Math.PI
  return path({ from : p[0]})
    .arc({ to : p[1], radius, largeArc })
    .line({ to : p[2] })
    .arc({ to : p[3], radius : radius + width, largeArc, clockwise : true })
    .line({ to : p[0] })
    .d
}

const Arc = ({ position, width, angle, ...global  }) => <Path d={d({ position : polar(position), width, angle })} {...global}/>

Arc.propTypes = {
  position : T.position.isRequired,
  width    : T.number.isRequired,
  angle    : T.number.isRequired,
}

export default Arc
