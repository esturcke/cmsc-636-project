import React  from "react"
import T      from "~/lib/types"
import styles from "./traffic.scss"

const Traffic = ({ mbps }) => mbps ? <span>{(mbps * 1000).toLocaleString(undefined, { maximumSignificantDigits : 2 })} kbps</span> : null

Traffic.propTypes = {
  mbps : T.number,
}

export default Traffic
