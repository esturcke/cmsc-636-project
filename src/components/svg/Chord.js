import React           from "react"
import { scaleLinear } from "d3-scale"
import Path            from "./Path"
import { distance }    from "~/lib/coordinates"
import path            from "~/lib/svg/path"
import T               from "~/lib/types"

const radiusScale = scaleLinear().domain([0, 1000]).range([0, 10000])
console.log(radiusScale)
const radius = (p1, p2) => radiusScale(distance(p1, p2))

const d = ({ from, to }) => {
  const clockwise = false
  return path({ from : from })
    .arc({ to, radius : radius(from, to), clockwise })
    .d
}

const Chord = ({ from, to, ...global  }) => <Path d={d({ from, to })} {...global}/>

Chord.propTypes = {
  from  : T.polar.isRequired,
  to    : T.polar.isRequired,
}

export default Chord
