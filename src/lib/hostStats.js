import { sumBy, flow, groupBy, mapValues } from "lodash/fp"
import { assignWith }                      from "lodash"

const stats = (from, to, mbps) => flows => ({
  traffic : {
    in  : mbps(sumBy(`${to}totalbytes`)(flows)),
    out : mbps(sumBy(`${from}totalbytes`)(flows)),
  },
})

const hostStats = ({ flows, mbps }) => {
  const srcStats = flow(
    groupBy("srcip"),
    mapValues(stats("src", "dst", mbps)),
  )(flows)

  const dstStats = flow(
    groupBy("dstip"),
    mapValues(stats("dst", "src", mbps)),
  )(flows)

  return assignWith({}, srcStats, dstStats, (...stats) => ({
    traffic : {
      in  : sumBy("traffic.in")(stats),
      out : sumBy("traffic.out")(stats),
    },
  }))
}

export { hostStats }
