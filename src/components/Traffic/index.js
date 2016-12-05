import React        from "react"
import { scaleLog } from "d3-scale"
import { map }      from "lodash"
import Arc          from "~/components/svg/Arc"
import T            from "~/lib/types"
import styles       from "./traffic.scss"

const scale = scaleLog().domain([1 / 1000, 100]).range([0.1, 50]).clamp(true)

const In = ({ host, traffic }) => (
  <Arc
    position={{ t : host.position.t, r : 420 }}
    angle={host.angle}
    width={scale(traffic)}
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
    className={styles.in}
  />
)

In.propTypes = {
  host    : T.host.isRequired,
  traffic : T.number.isRequired,
}

const Out = ({ host, traffic }) => (
  <Arc
    position={{ t : host.position.t, r : 418 }}
    angle={host.angle}
    width={-scale(traffic)}
    stroke="black"
    strokeOpacity={0.3}
    strokeWidth={0.25}
    className={styles.out}
  />
)

Out.propTypes = {
  host    : T.host.isRequired,
  traffic : T.number.isRequired,
}

const Traffic = ({ hosts, stats }) => hosts && stats ? (
  <g>
    {map(stats, ({ traffic }, ip) => hosts[ip] ? [
      <In  key={`${ip}-in`}  host={hosts[ip]} traffic={traffic.in}/>,
      <Out key={`${ip}-out`} host={hosts[ip]} traffic={traffic.out}/>,
    ] : null)}
  </g>
) : null

Traffic.propTypes = {
  hosts : T.object,
  stats : T.object,
}

export default Traffic
