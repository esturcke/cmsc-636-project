import fs          from "fs"
import es          from "event-stream"
import multistream from "multistream"

const FILES = [
  "./raw-vast-data/nf/nf-chunk1.csv",
  "./raw-vast-data/nf/nf-chunk2.csv",
  "./raw-vast-data/nf/nf-chunk3.csv",
  "./raw-vast-data/nf-week2.csv",
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

  cb(null, [
    Math.round(flow[0]), // time
    protocol(flow[3]),   // protocol
    flow[5],             // srcIp
    flow[6],             // dstIp
    parseInt(flow[7]),   // srcPort
    parseInt(flow[8]),   // dstPort
    parseInt(flow[9]),   // moreFragment
    parseInt(flow[10]),  // contFragment
    parseInt(flow[11]),  // duration
    parseInt(flow[12]),  // srcPayloadBytes
    parseInt(flow[12]),  // srcTotalBytes
    parseInt(flow[12]),  // dstPayloadBytes
    parseInt(flow[12]),  // dstTotalBytes
    parseInt(flow[13]),  // srcPacketCount
    parseInt(flow[14]),  // dstPacketCount
    parseInt(flow[15]),  // forcedOut
  ].join("\t") + "\n")
})

const removeJunk = pattern => es.map((line, cb) => { line.match(pattern) ? cb() : cb(null, line) })

console.log(`COPY flow (
  time,
  protocol,
  srcIp,
  dstIp,
  srcPort,
  dstPort,
  moreFragment,
  contFragment,
  duration,
  srcPayloadBytes,
  srcTotalBytes,
  dstPayloadBytes,
  dstTotalBytes,
  srcPacketCount,
  dstPacketCount,
  forcedOut
) FROM STDIN;`)

multistream(FILES.map(file => fs.createReadStream(file)))
  .pipe(es.split())
  .pipe(removeJunk(/^[\D]/))
  .pipe(construct)
  .pipe(process.stdout)
