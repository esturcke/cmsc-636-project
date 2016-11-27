import { flow, flatMap, filter, map, keyBy, uniq, zip, times, groupBy, mapValues, orderBy, take, values, flatten, find, max } from "lodash/fp"
import { forceSimulation, forceManyBody, forceLink } from "d3-force"
import { scalePow, scaleLinear }                     from "d3-scale"
import { polar, cartesian }                          from "~/lib/coordinates"

const isExternal = ip => !ip.match(/^172\.[1-3]/)

const forceDirectedPositions = (external, internal, flows) => {
  const nodes = [
    ...external.map(ip => ({ ip })),
    ...map(({ ip, position }) => ({ ip, ...cartesian(position), fixed : true }))(internal),
  ]

  // link external to top 5 internal by mbps
  const links = flow(
    filter(({ direction }) => direction !== "internal"),
    map(({ srcip, dstip, direction, mbps_received, mbps_sent }) => ({
      externalIp : direction === "inbound" ? srcip : dstip,
      internalIp : direction === "inbound" ? dstip : srcip,
      mbps       : mbps_received + mbps_sent,
    })),
    groupBy("externalIp"),
    mapValues(flow(orderBy("mbps")("desc"), take(20))),
    values,
    flatten,
    map(({ externalIp, internalIp, mbps }) => ({
      source : find(["ip", externalIp])(nodes),
      target : find(["ip", internalIp])(nodes),
      mbps,
    })),
  )(flows)

  const limitRadius = radius => _alpha => {
    nodes.forEach(node => {
      const position = polar(node)
      if (position.r > radius) {
        const { x, y } = cartesian({ ...position, r : radius })
        node.x = x
        node.y = y
      }
    })
  }

  const linkStrength = scalePow().exponent(0.8).domain([0, 5]).range([0, 1]).clamp(true)

  const pullToTraffic = forceSimulation(nodes).stop()
    .force("links", forceLink(links).strength(({ mbps }) => linkStrength(mbps) ))
    .force("limit", limitRadius(200))
  times(pullToTraffic.tick)(150)

  const distribute = forceSimulation(nodes).stop()
    .force("charge", forceManyBody().strength(-5).distanceMin(1).distanceMax(35))
    .force("limit", limitRadius(200))
  times(distribute.tick)(20)

  const positions   = nodes.slice(0, external.length).map(polar)
  const scaleRadius = scaleLinear().domain([0, max(positions.map(({ r }) => r))]).range([0, 250])
  return positions.map(({ t, r }) => cartesian({ t, r : scaleRadius(r) }))
}

const externalHosts = internal => flows => flow(
  flatMap(h => [h.srcip, h.dstip]),
  filter(isExternal),
  uniq,
  external => zip(external)(forceDirectedPositions(external, internal, flows)),
  map(([ip, { x, y }]) => ({ ip, position : { x, y } })),
  keyBy("ip"),
)(flows)

export { externalHosts, isExternal }
