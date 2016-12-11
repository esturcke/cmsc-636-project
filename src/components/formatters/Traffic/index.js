import React      from "react"
import filesize   from "filesize"
import { repeat } from "lodash"
import T          from "~/lib/types"
import styles     from "./traffic.scss"

const align = value => repeat("\u2007", 5 - value.replace(/\..*$/, "").length) + value

const Traffic = ({ mbps }) => {
  if (!mbps) return null
  const { value, suffix } = filesize(mbps * 1000000, { bits : true, base : 10, output : "object" })
  return (
    <span className={styles.wrapper}>
      <span className={styles.value}>{align(value.toLocaleString(undefined, { maximumSignificantDigits : 2 }))}</span>
      <span className={styles.units}>{suffix + "ps"}</span>
    </span>
  )
}

Traffic.propTypes = {
  mbps : T.number,
}

export default Traffic
