import React                     from "react"
import { scaleLog, scaleLinear } from "d3-scale"
import { range }                 from "lodash"
import Path                      from "~/components/svg/Path"
import T                         from "~/lib/types"
import styles                    from "./flow-summary.scss"

const width  = 1000
const height = 60
const padding = { top : 30, left : 10, right : 10 }
const trafficScale = scaleLog().domain([1, 700]).range([0.1, height / 2]).clamp(true)
const denyScale    = scaleLog().domain([5000, 50000]).range([0.1, 15]).clamp(true)

const dateFormat = new Intl.DateTimeFormat(undefined, {
  weekday : "short",
  day     : "numeric",
  month   : "short",
  hour    : "numeric",
  minute  : "numeric",
}).format
const currentDate = from => dateFormat(from * 1000 + 5 * 3600 * 1000)

const FlowSummary = ({ flows, intrusions, from, to, updateSpan }) => {
  if (!flows || !intrusions) return null
  const timeSpan = [flows[0].time, flows[flows.length - 1].time]
  const timeScale = scaleLinear().domain(timeSpan).range([padding.left, width - padding.left - padding.right])
  const common = {
    x     : 0,
    width : timeScale(flows[1].time) - timeScale(flows[0].time),
  }
  const format = new Intl.DateTimeFormat(undefined, {
    weekday : "short",
  }).format

  return (
    <g transform={`translate(${padding.left},${padding.top})`}>
      {range(
        new Date(timeSpan[0] * 1000).setHours(0,0,0,0) / 1000 - 5 * 3600,
        timeSpan[1] - 5 * 3600,
        24 * 3600,
      ).map((time, i) => {
        const start = timeScale(time)
        const eight = timeScale(time + 8 * 3600)
        const five  = timeScale(time + 17 * 3600)
        const end   = timeScale(time + 24 * 3600)
        const day   = format(new Date(time * 1000 + 8 * 3600 * 1000))
        return (
					<g key={i}>
						<rect x={start} width={eight - start} y={0} height={height} className={styles.offHours}/>
            <rect x={five} width={end - five} y={0} height={height} className={styles.offHours}/>
            <Path d={`M ${start} 0 l 0 ${height}`} className={styles.dateMarker}/>
            <Path d={`M ${eight} 0 l 0 ${height}`} className={styles.workdayMarker} strokeDasharray="1,5"/>
            <Path d={`M ${five} 0 l 0 ${height}`} className={styles.workdayMarker} strokeDasharray="1,5"/>
            <rect x={start} width={end - start} y={-15} height={15} className={styles.date}/>
            <text x={(start + end) / 2} y={-2} fill="#333" textAnchor="middle">{day}</text>
          </g>
				)
      })}
      {from && to ? (
        <g>
          <Path d={`M ${timeScale(from)} 0 l 0 ${height} L ${timeScale(to)} ${height} l 0 ${-height} Z`} className={styles.current}/>
          <text x={padding.left} y={height + 50} fill="#333" fontWeight="bold">{currentDate(from)}</text>
        </g>
        ) : null}
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
