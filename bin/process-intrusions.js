import fs          from "fs"
import es          from "event-stream"
import multistream from "multistream"

const FILES = [
  "./raw-vast-data/IPS-syslog-week2.csv",
]

const isExternal = ip => ip.match(/^10\./)

const direction = (srcIp, dstIp) =>
  isExternal(srcIp) ? "inbound"  :
  isExternal(dstIp) ? "outbound" : "internal"

const mapInternal = ip => ({
  "10.0.2.2"  : "172.10.0.2",
  "10.0.2.3"  : "172.10.0.3",
  "10.0.2.4"  : "172.10.0.4",
  "10.0.2.5"  : "172.10.0.5",
  "10.0.2.6"  : "172.10.0.7",
  "10.0.2.7"  : "172.10.0.8",
  "10.0.2.8"  : "172.10.0.9",
  "10.0.3.2"  : "172.20.0.2",
  "10.0.3.3"  : "172.20.0.3",
  "10.0.3.4"  : "172.20.0.4",
  "10.0.3.5"  : "172.20.0.5",
  "10.0.3.6"  : "172.20.0.6",
  "10.0.3.7"  : "172.20.0.7",
  "10.0.3.8"  : "172.20.0.8",
  "10.0.3.15" : "172.20.0.15",
  "10.0.4.2"  : "172.30.0.2",
  "10.0.4.3"  : "172.30.0.3",
  "10.0.4.4"  : "172.30.0.4",
  "10.0.4.5"  : "172.30.0.5",
  "10.0.4.6"  : "172.30.0.6",
  "10.0.4.7"  : "172.30.0.7",
  "10.0.4.8"  : "172.30.0.8",
})[ip] || ip

const construct = es.map((line, cb) => {
  const intrusion = line.split(/,/)
  if (intrusion.length === 1) return cb()

  // Columns
  //  0 dateTime
  //  1 priority
  //  2 operation
  //  3 messageCode
  //  4 protocol
  //  5 SrcIp
  //  6 destIp
  //  7 srcPort
  //  8 destPort
  //  9 destService
  // 10 direction
  // 11 flags
  // 12 command

  const srcIp = mapInternal(intrusion[5])
  const dstIp = mapInternal(intrusion[6])

  cb(null, [
    Date.parse(intrusion[0]) / 1000,  // time
    intrusion[4].toLowerCase(),       // protocol
    srcIp,                            // srcIp
    parseInt(intrusion[7]),           // srcPort
    dstIp,                            // dstIp
    parseInt(intrusion[8]),           // dstPort
    direction(srcIp, dstIp),          // direction
    intrusion[9],                     // service
    intrusion[1].toLowerCase(),       // priority
    intrusion[2].toLowerCase(),       // operation
    intrusion[3],                     // messageCode
    intrusion[11],                    // flags
  ].join("\t") + "\n")
})

const removeJunk = pattern => es.map((line, cb) => { line.match(pattern) ? cb() : cb(null, line) })

console.log(`COPY intrusion(
  time,
  protocol,
  srcIp,
  srcPort,
  dstIp,
  dstPort,
  direction,
  service,
  priority,
  operation,
  messageCode,
  flags
) FROM STDIN;`)

multistream(FILES.map(file => fs.createReadStream(file)))
  .pipe(es.split())
  .pipe(removeJunk(/^[\D]/))
  .pipe(construct)
  .pipe(process.stdout)
