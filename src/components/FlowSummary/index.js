import React                     from "react"
import { scaleLog, scaleLinear } from "d3-scale"
import Path                      from "~/components/svg/Path"
import path                      from "~/lib/svg/path"
import T                         from "~/lib/types"

const width  = 1000
const height = 100
const padding = { top : 5, left : 15, right : 15 }
const trafficScale = scaleLog().domain([1, 1000]).range([0.1, height / 3]).clamp(true)

const FlowSummary = ({ summary, from, to }) => {
  if (!summary) return null
  const timeSpan = [summary[0].time, summary[summary.length - 1].time]
  const timeScale = scaleLinear().domain(timeSpan).range([padding.left, width - padding.left - padding.right])
  const common = {
    x     : 0,
    width : timeScale(summary[1].time) - timeScale(summary[0].time),
    opacity : 0.3,
  }

  return (
    <g transform={`translate(${padding.left},${padding.top})`}>
      <Path d={`M ${timeScale(from)} 0 l 0 ${height} L ${timeScale(to)} ${height} l 0 ${-height} Z`}/>
      {summary.map(({ time, mbps_inbound, mbps_outbound }, i) => (
        <g key={i} transform={`translate(${timeScale(time)},${height / 2})`}>
          <rect y={0.5} height={trafficScale(mbps_outbound)} {...common} transform="scale(1,-1)"/>
          <rect y={0.5} height={trafficScale(mbps_inbound)} {...common}/>
        </g>
      ))}
    </g>
  )
}

FlowSummary.propTypes = {
  summary : T.arrayOf(T.shape({
    time          : T.number.isRequired,
    mbps_inbound  : T.number.isRequired,
    mbps_outbound : T.number.isRequired,
  })),
  from    : T.number.isRequired,
  to      : T.number.isRequired,
}

export default FlowSummary
