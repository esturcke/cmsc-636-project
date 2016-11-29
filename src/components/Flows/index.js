import React                 from "react"
import { scaleLog }          from "d3-scale"
import { values, max }       from "lodash"
import Line                  from "~/components/svg/Line"
import { polar, difference } from "~/lib/coordinates"
import T                     from "~/lib/types"

const width = scaleLog().domain([1 / 1000, 1000]).range([1 / 8, 4]).clamp(true)

const edges = ({ flows }) => {
  return values(flows)
}

const Flows = ({ internalHosts, externalHosts, flows }) => (
  <g>
    <defs>
      <linearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="hsl(136, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(0, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="up" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="hsl(0, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(136, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="left" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="hsl(0, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(136, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="down" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="hsl(136, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(0, 62%, 51%)"/>
      </linearGradient>
    </defs>
    {edges({ externalHosts, flows }).map((flow, i) => {
      const from  = internalHosts[flow.srcip] || externalHosts[flow.srcip]
      const to    = internalHosts[flow.dstip] || externalHosts[flow.dstip]
      if (!from || !to) return null
      const strokeWidth = width(max([
        flow.mbps_sent,
        flow.mbps_received,
      ]))
      const angle = polar(difference(to.position, from.position)).t
      const direction =
        angle < -3 * Math.PI / 4 ? "left"  :
        angle < -1 * Math.PI / 4 ? "up"    :
        angle <      Math.PI / 4 ? "right" :
        angle <  3 * Math.PI / 4 ? "down"  : "left"

      return (
        <Line key={i}
          from={from.position}
          to={to.position}
          stroke={`url(#${direction})`}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          fill="none"
        />
      )
    })}
  </g>
)

Flows.propTypes = {
  internalHosts : T.object,
  externalHosts : T.object,
  flows : T.array,
}

export default Flows
