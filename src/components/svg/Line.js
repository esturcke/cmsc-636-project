import React         from "react"
import { cartesian } from "~/lib/coordinates"
import T             from "~/lib/types"

const Line = ({ from, to, ...props }) => {
  const { x : x1, y : y1 } = cartesian(from)
  const { x : x2, y : y2 } = cartesian(to)
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...props}/>
}

Line.propTypes = {
  from : T.position.isRequired,
  to   : T.position.isRequired,
  ...T.globalTypes,
}

export default Line
