import { sumBy, flow, groupBy, mapValues } from "lodash/fp"
import { assignWith }                      from "lodash"

const mbps = (bytes, seconds) => bytes * 8 / 1000000 / seconds

const stats = (from, to, seconds) => flows => ({
  traffic : {
    in  : mbps(sumBy(`${to}totalbytes`)(flows), seconds),
    out : mbps(sumBy(`${from}totalbytes`)(flows), seconds),
  },
})

const hostStats = ({ flows, span }) => {
  const srcStats = flow(
    groupBy("srcip"),
    mapValues(stats("src", "dst", span)),
  )(flows)

  const dstStats = flow(
    groupBy("dstip"),
    mapValues(stats("dst", "src", span)),
  )(flows)

  return assignWith({}, srcStats, dstStats, (...stats) => ({
    traffic : {
      in  : sumBy("traffic.in")(stats),
      out : sumBy("traffic.out")(stats),
    },
  }))
}

export { hostStats }
