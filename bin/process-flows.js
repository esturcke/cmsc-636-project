import fs                     from "fs"
import es                     from "event-stream"
import { toLong as ipToLong } from "ip"
import multistream            from "multistream"

const FILES = [
  "./raw-vast-data/100-flows.csv",
  /*
  "./raw-vast-data/nf/nf-chunk1.csv",
  "./raw-vast-data/nf/nf-chunk2.csv",
  "./raw-vast-data/nf/nf-chunk3.csv",
  "./raw-vast-data/nf-week2.csv",
  */
]

const protocol = n => {
  switch (n) {
    case "1"  : return "icmp"
    case "6"  : return "tcp"
    case "17" : return "udp"
    default   : throw `Unknown protocol : ${n}`
  }
}

const construct = es.map((line, cb) => {
  const flow = line.split(/,/)
  if (flow.length === 1) return cb()

  // Log data we are currently ignoring
  if (parseInt(flow[9]))  console.log(`More fragment: ${flow[9]}`)
  if (parseInt(flow[10])) console.log(`Cont fragment: ${flow[10]}`)

  cb(null, [
    flow[0] * 1000,      // time
    protocol(flow[3]),   // protocol
    ipToLong(flow[5]),   // srcIp
    ipToLong(flow[6]),   // dstIp
    parseInt(flow[7]),   // srcPort
    parseInt(flow[8]),   // dstPort
    parseInt(flow[11]),  // duration
    parseInt(flow[12]),  // srcPayloadBytes
    parseInt(flow[12]),  // srcTotalBytes
    parseInt(flow[12]),  // dstPayloadBytes
    parseInt(flow[12]),  // dstTotalBytes
    parseInt(flow[13]),  // srcPacketCount
    parseInt(flow[14]),  // dstPacketCount
    parseInt(flow[15]),  // forcedOut
  ].join(",") + "\n")
})

const removeJunk = pattern => es.map((line, cb) => { line.match(pattern) ? cb() : cb(null, line) })

multistream(FILES.map(file => fs.createReadStream(file)))
  .pipe(es.split())
  .pipe(removeJunk(/^[\D]/))
  .pipe(construct)
  .pipe(process.stdout)
