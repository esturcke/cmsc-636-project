import React     from "react"
import Arc       from "~/components/svg/Arc"
import T         from "~/lib/types"
import { color } from "~/lib/hosts"
import styles    from "./host.scss"

const Host = ({ host }) => (
  <Arc
    className={styles.host}
    position={host.position}
    angle={host.angle}
    width={10}
    fill={color(host)}
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
  />
)

Host.propTypes = {
  host : T.host.isRequired,
}

export default Host
