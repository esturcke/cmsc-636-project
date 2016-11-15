import React      from 'react'
import { values } from 'lodash'
import Arc        from '~/components/svg/Arc'
import T          from '~/lib/types'

const HostCircle = ({ hosts }) => (
  <g transform="translate(500, 500)">
    {values(hosts).map(host => (
      <Arc position={host.position}
        width={10}
        angle={host.angle}
        fill="none"
        stroke="gray"
        strokeWidth={0.25}
        key={host.i}
      />
    ))}
  </g>
)

HostCircle.propTypes = {
  hosts : T.object,
}

export default HostCircle
