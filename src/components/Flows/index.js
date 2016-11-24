import React           from "react"
import { scaleLog }    from "d3-scale"
import { values, max } from "lodash"
import Line            from "~/components/svg/Line"
import T               from "~/lib/types"

const width = scaleLog().domain([1 / 1000, 1000]).range([1 / 8, 4]).clamp(true)

const Flows = ({ hosts, flows }) => (
  <g>
    {values(flows).map((flow, i) => {
      const from = hosts[flow.srcip]
      const to   = hosts[flow.dstip]
      const strokeWidth = width(max([
        flow.srctotalbytes,
        flow.dsttotalbytes,
      ]))
      return from && to ? (
        <Line key={i}
          from={from.position}
          to={to.position}
          stroke="#999"
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
