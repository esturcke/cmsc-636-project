import React     from "react"
import Arc       from "~/components/svg/Arc"
import T         from "~/lib/types"
import { color } from "~/lib/hosts"
import styles    from "./host.scss"

const Host = ({ host, setShowOnly, showOnly }) => (
  <Arc
    className={styles.host}
    position={host.position}
    angle={host.angle}
    width={10}
    fill={color(host)}
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
    onClick={() => setShowOnly(host.ip === showOnly ? null : host.ip)}
  />
)

Host.propTypes = {
  host        : T.host.isRequired,
  setShowOnly : T.func.isRequired,
  showOnly    : T.string,
}

export default Host
