import React      from "react"
import { values } from "lodash"
import Circle     from "~/components/svg/Circle"
import T          from "~/lib/types"

const ExternalHosts = ({ hosts }) => (
  <g>
    {values(hosts).map((host, i) => <Circle key={i} radius={4} position={host.position} stroke="#777" fill="none"/>)}
  </g>
)

ExternalHosts.propTypes = {
  hosts : T.arrayOf(T.object),
}

export default ExternalHosts
