import { flow, flatMap, filter, map, keyBy } from "lodash/fp"

const maxRadius = 200

const randomPosition = () => ({
  r : Math.random() * maxRadius,
  t : Math.random() * 2 * Math.PI,
})

const isExternal = ip => !ip.match(/^172\.[1-3]/)

const externalHosts = flows => {
  return flow(
    flatMap(h => [h.srcip, h.dstip]),
    filter(isExternal),
    map(ip => ({
      ip,
      position : randomPosition(),
    })),
    keyBy("ip"),
  )(flows)
}

export { externalHosts, isExternal }
