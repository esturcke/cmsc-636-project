import React from "react"
import Arc   from "~/components/svg/Arc"
import T     from "~/lib/types"

const Host = ({ host : { position, angle } }) => (
  <Arc position={position}
    width={10}
    angle={angle}
    fill="none"
    stroke="gray"
    strokeWidth={0.25}
  />
)

Host.propTypes = {
  host : T.host.isRequired,
}

export default Host
