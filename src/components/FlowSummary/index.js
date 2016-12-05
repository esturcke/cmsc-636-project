import React                     from "react"
import { scaleLog, scaleLinear } from "d3-scale"
import Path                      from "~/components/svg/Path"
import T                         from "~/lib/types"
import styles                    from "./flow-summary.scss"

const width  = 1000
const height = 100
const padding = { top : 5, left : 15, right : 15 }
const trafficScale = scaleLog().domain([1, 1000]).range([0.1, height / 2]).clamp(true)
const denyScale    = scaleLog().domain([5000, 50000]).range([0.1, 15]).clamp(true)

const FlowSummary = ({ flows, intrusions, from, to, updateSpan }) => {
  if (!flows || !intrusions) return null
  const timeSpan = [flows[0].time, flows[flows.length - 1].time]
  const timeScale = scaleLinear().domain(timeSpan).range([padding.left, width - padding.left - padding.right])
  const common = {
    x     : 0,
    width : timeScale(flows[1].time) - timeScale(flows[0].time),
  }

  return (
    <g transform={`translate(${padding.left},${padding.top})`}>
      {from && to ? <Path d={`M ${timeScale(from)} 0 l 0 ${height} L ${timeScale(to)} ${height} l 0 ${-height} Z`} className={styles.current}/> : null}
      {flows.map(({ time, mbps_inbound, mbps_outbound }, i) => (
        <g key={i} transform={`translate(${timeScale(time)},${height / 2})`}>
          <rect y={1} height={trafficScale(mbps_outbound)} {...common} transform="scale(1,-1)" className={styles.out}/>
          <rect y={1} height={trafficScale(mbps_inbound)} {...common} className={styles.in}/>
          <rect y={-height / 2} height={height} {...common} onClick={() => updateSpan(time)} className={styles.button}/>
        </g>
      ))}
      {intrusions.map(({ time, deny_events }, i) => (
        <g key={i} transform={`translate(${timeScale(time)},${height / 2})`}>
          <rect y={-denyScale(deny_events) / 2} height={denyScale(deny_events)} {...common} className={styles.deny}/>
        </g>
      ))}
    </g>
  )
}

FlowSummary.propTypes = {
  flows      : T.arrayOf(T.shape({
    time          : T.number.isRequired,
    mbps_inbound  : T.number.isRequired,
    mbps_outbound : T.number.isRequired,
  })),
  intrusions : T.arrayOf(T.shape({
    time        : T.number.isRequired,
    deny_events : T.number.isRequired,
  })),
  from       : T.number,
  to         : T.number,
  updateSpan : T.func.isRequired,
}

export default FlowSummary
