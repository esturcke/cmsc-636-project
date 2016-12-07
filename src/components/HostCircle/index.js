import React      from "react"
import { values } from "lodash"
import Host       from "~/components/Host"
import T          from "~/lib/types"

const HostCircle = ({ hosts, setShowOnly }) => (
  <g>
    {values(hosts).map(host => <Host key={host.ip} host={host} setShowOnly={setShowOnly}/>)}
  </g>
)

HostCircle.propTypes = {
  hosts       : T.object,
  setShowOnly : T.func.isRequired,
}

export default HostCircle
