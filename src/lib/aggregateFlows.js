import { flow, groupBy, mapValues, values, reduce } from "lodash/fp"

const aggregate = flows => reduce((acc, { mbps_sent, mbps_received }) => {
  acc.mbps_sent     += mbps_sent
  acc.mbps_received += mbps_received
  return acc
})({
  srcip         : flows[0].srcip,
  dstip         : flows[0].dstip,
  direction     : flows[0].direction,
  mbps_sent     : 0,
  mbps_received : 0,
})(flows)

const aggregateFlows = flow(
  groupBy(({ srcip, dstip }) => `${srcip}-${dstip}`),
  mapValues(aggregate),
  values,
)

export { aggregateFlows }
