import React      from "react"
import Arc        from "~/components/svg/Arc"
import { values } from "lodash"
import T          from "~/lib/types"

const In = ({ host, width }) => (
  <Arc
    position={{ t : host.position.t, r : 420 }}
    angle={host.angle}
    width={width}
    fill="gray"
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
  />
)

const Out = ({ host, width }) => (
  <Arc
    position={{ t : host.position.t, r : 418 }}
    angle={host.angle}
    width={-width}
    fill="gray"
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
  />
)
const Traffic = ({ hosts, traffic }) => {
  return (
    <g>
      {values(hosts).map(host => <In key={host.ip} host={host} width={Math.random() * 40}/>)}
      {values(hosts).map(host => <Out key={host.ip} host={host} width={Math.random() * 40}/>)}
    </g>
  )
}

Traffic.propTypes = {
  hosts : T.object,
}

export default Traffic
