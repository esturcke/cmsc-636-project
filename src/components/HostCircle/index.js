import React      from "react"
import { values } from "lodash"
import Host       from "~/components/Host"
import T          from "~/lib/types"

const HostCircle = ({ hosts, setShowOnly, showOnly }) => (
  <g>
    {values(hosts).map(host => <Host key={host.ip} host={host} setShowOnly={setShowOnly} showOnly={showOnly}/>)}
  </g>
)

HostCircle.propTypes = {
  hosts       : T.object,
  setShowOnly : T.func.isRequired,
  showOnly    : T.string,
}

export default HostCircle
