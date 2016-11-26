import React           from "react"
import { scaleLog }    from "d3-scale"
import { values, max } from "lodash"
import Line            from "~/components/svg/Line"
import T               from "~/lib/types"

const width = scaleLog().domain([1 / 1000, 1000]).range([1 / 8, 4]).clamp(true)

const Flows = ({ hosts, flows }) => (
  <g>
    <defs>
    <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="hsl(136, 62%, 51%)"/>
      <stop offset="20%"  stopColor="#999"/>
      <stop offset="80%"  stopColor="#999"/>
      <stop offset="100%" stopColor="hsl(0, 62%, 51%)"/>
    </linearGradient>
  </defs>
    {values(flows).map((flow, i) => {
      const from = hosts[flow.srcip]
      const to   = hosts[flow.dstip]
      const strokeWidth = width(max([
        flow.mbps_sent,
        flow.mbps_received,
      ]))
      return from && to ? (
        <Line key={i}
          from={from.position}
          to={to.position}
          stroke="url(#flow)"
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          fill="none"
        />
      ) : null
    })}
  </g>
)

Flows.propTypes = {
  hosts : T.object,
  flows : T.array,
}

export default Flows
