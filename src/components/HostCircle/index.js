import React from 'react'
import Arc   from '~/components/svg/Arc'

const HostCircle = () => {
  return <Arc position={{ r : 150, t : 2 }} width={30} angle={2} fill="none" stroke="black" transform="translate(200,200)"/>
}

export default HostCircle
