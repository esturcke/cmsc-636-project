import fs                      from 'fs'
import es                      from 'event-stream'
import assert                  from 'assert'
import { toLong as ipToLong }  from 'ip'
import mongoose                from 'mongoose'
import multistream             from 'multistream'
import { Netflow as Resource } from '~/model'

mongoose.Promise = global.Promise

const MONGO = 'mongodb://localhost:27017/test'
const FILES = [
  './raw-vast-data/nf/nf-chunk1.csv',
  './raw-vast-data/nf/nf-chunk2.csv',
  './raw-vast-data/nf/nf-chunk3.csv',
  './raw-vast-data/nf-week2.csv',
]

const protocol = n => {
  switch (n) {
    case '1'  : return 'icmp'
    case '6'  : return 'tcp'
    case '17' : return 'udp'
    default   : throw `Unknown protocol : ${n}`
  }
}

const construct = es.map((line, cb) => {
  const flow = line.split(/,/)

  // Log data we are currently ignoring
  if (parseInt(flow[9]))  console.log(`More fragment: ${flow[9]}`)
  if (parseInt(flow[10])) console.log(`Cont fragment: ${flow[10]}`)

  cb(null, {
    time            : flow[0] * 1000,
    protocol        : protocol(flow[3]),
    srcIp           : ipToLong(flow[5]),
    dstIp           : ipToLong(flow[6]),
    srcPort         : parseInt(flow[7]),
    dstPort         : parseInt(flow[8]),
    duration        : parseInt(flow[11]),
    srcPayloadBytes : parseInt(flow[12]),
    srcTotalBytes   : parseInt(flow[12]),
    dstPayloadBytes : parseInt(flow[12]),
    dstTotalBytes   : parseInt(flow[12]),
    srcPacketCount  : parseInt(flow[13]),
    dstPacketCount  : parseInt(flow[14]),
    forcedOut       : parseInt(flow[15]),
  })
})

const removeJunk = pattern => es.map((line, cb) => { line.match(pattern) ? cb() : cb(null, line) })
const stream = () => multistream(FILES.map(file => fs.createReadStream(file)))
  .pipe(es.split())
  .pipe(removeJunk(/^[\D]/))
  .pipe(construct)

const insert = (objects, done) => {
  objects.pipe(es.map((object, cb) => {
    new Resource(object).save(err => {
      if (err) console.error(err)
      cb()
    })
  }))
  .pipe(es.wait((err, body) => done()))
}

mongoose.connect(MONGO)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  Resource.remove({}, () => {
    insert(stream(), () => { mongoose.disconnect() })
  })
})
