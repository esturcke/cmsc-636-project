import React      from "react"
import { values } from "lodash"
import Host       from "~/components/Host"
import T          from "~/lib/types"

const HostCircle = ({ hosts }) => (
  <g>
    {values(hosts).map(host => <Host key={host.ip} host={host}/>)}
  </g>
)

HostCircle.propTypes = {
  hosts : T.object,
}

export default HostCircle
