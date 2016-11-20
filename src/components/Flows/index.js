import React      from "react"
import { values } from "lodash"
import Line       from "~/components/svg/Line"
import T          from "~/lib/types"

const Flows = ({ hosts, flows }) => (
  <g>
    {values(flows).map((flow, i) => {
      const from = hosts[flow.srcIp]
      const to   = hosts[flow.dstIp]
      return from && to ? <Line key={i} from={from.position} to={to.position} stroke="#999" strokeWidth={0.5} strokeOpacity={0.2} fill="none"/> : null
    })}
  </g>
)

Flows.propTypes = {
  hosts : T.object,
  flows : T.array,
}

export default Flows
