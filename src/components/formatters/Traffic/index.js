import React  from "react"
import T      from "~/lib/types"
import styles from "./traffic.scss"

const Traffic = ({ mbps }) => <span>{(mbps * 1000).toLocaleString(undefined, { maximumSignificantDigits : 2 })} kbps</span>

Traffic.propTypes = {
  mbps : T.number.isRequired,
}

export default Traffic
