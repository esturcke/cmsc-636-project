import React      from "react"
import { values } from "lodash"
import Host       from "~/components/Host"
import T          from "~/lib/types"

const HostCircle = ({ hosts }) => (
  <g transform="translate(500, 500)">
    {values(hosts).map(host => <Host key={host.ip} host={host}/>)}
  </g>
)

HostCircle.propTypes = {
  hosts : T.object,
}

export default HostCircle
