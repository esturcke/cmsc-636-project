import React                           from "react"
import { scaleLog }                    from "d3-scale"
import { voronoi }                     from "d3-voronoi"
import { values, max }                 from "lodash"
import { set, get, flow, reduce }      from "lodash/fp"
import Line                            from "~/components/svg/Line"
import { polar, difference, distance } from "~/lib/coordinates"
import T                               from "~/lib/types"

const width = scaleLog().domain([1 / 1000, 1000]).range([1 / 8, 4]).clamp(true)

const name = ([ x, y ]) => `${x},${y}`

const edges = ({ externalHosts, flows }) => {
  if (externalHosts) {
    const polygons = voronoi()
      .extent([[-250, -250], [250, 250]])
      .x(get("position.x"))
      .y(get("position.y"))(values(externalHosts)).polygons()
    const graph = reduce((graph, polygon) => {
      for (let i = 0; i < polygon.length; i++) {
        const v1  = polygon[(i - 1 + polygon.length) % polygon.length]
        const v2  = polygon[i]
        const v3  = polygon[(i + 1) % polygon.length]
        const d12 = distance({ x : v1[0], y : v1[1] }, { x : v2[0], y : v2[1] })
        const d23 = distance({ x : v2[0], y : v2[1] }, { x : v3[0], y : v3[1] })
        graph = flow(
          set([name(v2), name(v1)])(d12),
          set([name(v2), name(v1)])(d12),
          set([name(v2), name(v3)])(d23),
          set([name(v3), name(v2)])(d23),
          set([polygon.data.ip, name(v2)])(distance(polygon.data.position, { x : v2[0], y : v2[1] })),
          set([name(v2), polygon.data.ip])(distance(polygon.data.position, { x : v2[0], y : v2[1] })),
        )(graph)
      }
      return graph
    })({})(polygons)

    console.log(graph)
  }
  return values(flows)
}

const Flows = ({ internalHosts, externalHosts, flows }) => (
  <g>
    <defs>
      <linearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="hsl(136, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(0, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="up" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="hsl(0, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(136, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="left" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="hsl(0, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(136, 62%, 51%)"/>
      </linearGradient>
      <linearGradient id="down" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="hsl(136, 62%, 51%)"/>
        <stop offset="20%"  stopColor="#999"/>
        <stop offset="80%"  stopColor="#999"/>
        <stop offset="100%" stopColor="hsl(0, 62%, 51%)"/>
      </linearGradient>
    </defs>
    {edges({ externalHosts, flows }).map((flow, i) => {
      const from  = internalHosts[flow.srcip] || externalHosts[flow.srcip]
      const to    = internalHosts[flow.dstip] || externalHosts[flow.dstip]
      if (!from || !to) return null
      const strokeWidth = width(max([
        flow.mbps_sent,
        flow.mbps_received,
      ]))
      const angle = polar(difference(to.position, from.position)).t
      const direction =
        angle < -3 * Math.PI / 4 ? "left"  :
        angle < -1 * Math.PI / 4 ? "up"    :
        angle <      Math.PI / 4 ? "right" :
        angle <  3 * Math.PI / 4 ? "down"  : "left"

      return (
        <Line key={i}
          from={from.position}
          to={to.position}
          stroke={`url(#${direction})`}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          fill="none"
        />
      )
    })}
  </g>
)

Flows.propTypes = {
  internalHosts : T.object,
  externalHosts : T.object,
  flows : T.array,
}

export default Flows
