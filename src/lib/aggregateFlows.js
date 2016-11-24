import { flow, groupBy, mapValues, values, reduce } from "lodash/fp"

const aggregate = mbps => flows => reduce((acc, { srctotalbytes, dsttotalbytes }) => {
  acc.srctotalbytes += mbps(srctotalbytes)
  acc.dsttotalbytes += mbps(dsttotalbytes)
  return acc
})({
  srcip         : flows[0].srcip,
  dstip         : flows[0].dstip,
  srctotalbytes : 0,
  dsttotalbytes : 0,
})(flows)

const aggregateFlows = mbps => flow(
  groupBy(({ srcip, dstip }) => `${srcip}-${dstip}`),
  mapValues(aggregate(mbps)),
  values,
)

export { aggregateFlows }
