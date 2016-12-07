import React          from "react"
import { getService } from "port-numbers"
import T              from "~/lib/types"
import styles         from "./connection.scss"

const Connection = ({ srcip, dstip, dstport, protocol }) => {
  const service = getService(dstport, protocol)
  return (
    <span className={styles.wrapper}>
      <span className={styles.srcip}>{srcip}</span>
      <span className={styles.arrow}>→</span>
      <span className={styles.dstip}>{dstip}</span>
      <span className={styles.port}>: {dstport}</span>
      {service ? <span className={styles.service}>/ {service.name}</span> : null}
    </span>
  )
}

Connection.propTypes = {
  srcip    : T.string.isRequired,
  dstip    : T.string.isRequired,
  dstport  : T.number.isRequired,
  protocol : T.string.isRequired,
}

export default Connection
