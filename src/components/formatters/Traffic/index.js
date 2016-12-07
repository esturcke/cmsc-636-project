import React  from "react"
import T      from "~/lib/types"
import styles from "./traffic.scss"

const Traffic = ({ mbps }) => mbps ? (
  <span className={styles.wrapper}>
    <span className={styles.value}>{(mbps * 1000).toLocaleString(undefined, { maximumSignificantDigits : 2 })}</span>
    <span className={styles.units}>kbps</span>
  </span>
) : null

Traffic.propTypes = {
  mbps : T.number,
}

export default Traffic
