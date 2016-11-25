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

const isExternal = ip => ip.match(/^10\./)

const direction = (srcIp, dstIp) =>
  isExternal(srcIp) ? "inbound"  :
  isExternal(dstIp) ? "outbound" : "internal"

const construct = es.map((line, cb) => {
  const flow = line.split(/,/)
  if (flow.length === 1) return cb()

  // Columns
  //  0 TimeSeconds
  //  1 parsedDate
  //  2 dateTimeStr
  //  3 ipLayerProtocol
  //  4 ipLayerProtocolCode
  //  5 firstSeenSrcIp
  //  6 firstSeenDestIp
  //  7 firstSeenSrcPort
  //  8 firstSeenDestPort
  //  9 moreFragments
  // 10 contFragments
  // 11 durationSeconds
  // 12 firstSeenSrcPayloadBytes
  // 13 firstSeenDestPayloadBytes
  // 14 firstSeenSrcTotalBytes
  // 15 firstSeenDestTotalBytes
  // 16 firstSeenSrcPacketCount
  // 17 firstSeenDestPacketCount
  // 18 recordForceOut

  cb(null, [
    Math.round(flow[0]),         // time
    protocol(flow[3]),           // protocol
    flow[5],                     // srcIp
    flow[6],                     // dstIp
    parseInt(flow[7]),           // srcPort
    parseInt(flow[8]),           // dstPort
    direction(flow[5], flow[6]), // direction
    parseInt(flow[9]),           // moreFragment
    parseInt(flow[10]),          // contFragment
    parseInt(flow[11]),          // duration
    parseInt(flow[12]),          // srcPayloadBytes
    parseInt(flow[14]),          // srcTotalBytes
    parseInt(flow[13]),          // dstPayloadBytes
    parseInt(flow[15]),          // dstTotalBytes
    parseInt(flow[16]),          // srcPacketCount
    parseInt(flow[17]),          // dstPacketCount
    parseInt(flow[18]),          // forcedOut
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
  direction,
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
