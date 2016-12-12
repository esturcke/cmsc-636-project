import React          from "react"
import { getService } from "port-numbers"
import classNames     from "classnames"
import T              from "~/lib/types"
import styles         from "./connection.scss"

const Connection = ({ srcip, dstip, dstport, protocol, showOnly, setShowOnly }) => {
  const service = getService(dstport, protocol)
  return (
    <span className={styles.wrapper}>
      <span className={classNames(styles.srcip, { [styles.selected] : showOnly === srcip })} onClick={() => setShowOnly(srcip === showOnly ? null : srcip)}>{srcip}</span>
      <span className={styles.symbol}>→</span>
      <span className={classNames(styles.dstip, { [styles.selected] : showOnly === dstip })} onClick={() => setShowOnly(dstip === showOnly ? null : dstip)}>{dstip}</span>
      <span className={styles.symbol}>:</span>
      <span className={styles.port}>{dstport}</span>
      <span className={styles.service}>/ {service.name || "?"}</span>
    </span>
  )
}

Connection.propTypes = {
  srcip       : T.string.isRequired,
  dstip       : T.string.isRequired,
  dstport     : T.number.isRequired,
  protocol    : T.string.isRequired,
  setShowOnly : T.func.isRequired,
  showOnly    : T.string,
}

export default Connection
