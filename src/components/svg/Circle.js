import React         from "react"
import { cartesian } from "~/lib/coordinates"
import T             from "~/lib/types"

const Circle = ({ position, radius, ...props }) => {
  const { x, y } = cartesian(position)
  return <circle cx={x} cy={y} r={radius} {...props}/>
}

Circle.propTypes = {
  position : T.position.isRequired,
  radius   : T.number.isRequired,
  ...T.globalTypes,
}

export default Circle
