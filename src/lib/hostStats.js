import { sumBy, flow, groupBy, mapValues } from "lodash/fp"
import { assignWith }                      from "lodash"

const stats = (from, to) => flows => ({
  traffic : {
    in  : sumBy(`mbps_${to}`)(flows),
    out : sumBy(`mbps_${from}`)(flows),
  },
})

const hostStats = flows => {
  const srcStats = flow(
    groupBy("srcip"),
    mapValues(stats("received", "sent")),
  )(flows)

  const dstStats = flow(
    groupBy("dstip"),
    mapValues(stats("sent", "received")),
  )(flows)

  return assignWith({}, srcStats, dstStats, (...stats) => ({
    traffic : {
      in  : sumBy("traffic.in")(stats),
      out : sumBy("traffic.out")(stats),
    },
  }))
}

export { hostStats }
