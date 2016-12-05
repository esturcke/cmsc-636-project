import React      from "react"
import { values } from "lodash"
import Circle     from "~/components/svg/Circle"
import Tooltip    from "~/components/Tooltip"
import T          from "~/lib/types"

const Details = ({ host }) => <div>{host.ip}</div>

Details.propTypes = {
  host : T.externalHost,
}

const ExternalHosts = ({ hosts, setShowOnly }) => (
  <g>
    {values(hosts).map((host, i) => (
      <Tooltip key={i} id={`external-host-${i}`} content={<Details host={host}/>}>
        <Circle
          radius={4}
          position={host.position}
          stroke="#777"
          fill="white"
          onMouseOver={() => setShowOnly(host.ip)}
          onMouseOut={() => setShowOnly()}
        />
      </Tooltip>
    ))}
  </g>
)

ExternalHosts.propTypes = {
  hosts       : T.object,
  setShowOnly : T.func.isRequired,
}

export default ExternalHosts
