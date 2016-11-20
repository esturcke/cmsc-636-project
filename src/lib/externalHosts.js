import { flow, flatMap, filter, map, keyBy } from "lodash/fp"
import { fromLong as ipFromLong }            from "ip"

const maxRadius = 200

const randomPosition = () => ({
  r : Math.random() * maxRadius,
  t : Math.random() * 2 * Math.PI,
})

const isExternal = n => ipFromLong(n).substring(0, 3) === "10."

const externalHosts = flows => {
  return flow(
    flatMap(h => [h.srcIp, h.dstIp]),
    filter(isExternal),
    map(ip => ({
      ip,
      prettyIp : ipFromLong(ip),
      position : randomPosition(),
    })),
    keyBy("ip"),
  )(flows)
}

export { externalHosts, isExternal }
