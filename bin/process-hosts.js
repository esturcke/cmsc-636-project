import fs                     from "fs"
import es                     from "event-stream"
import assert                 from "assert"
import { toLong as ipToLong } from "ip"
import adjNoun                from "adj-noun"
import mongoose               from "mongoose"
import { Host }               from "~/model"

mongoose.Promise = global.Promise

const FILE = "./raw-vast-data/2013MC3AnswerSheetandDataDescriptions/BigMktNetwork.txt"
const URL  = "mongodb://localhost:27017/test"

const keepData = es.map((line, cb) => {
  if (line.match(/^(\s*|#.*)$/))
    cb()
  else
    cb(null, line)
})

const site = ip       => ip.match(/^172.(\d)/)[1]
const type = hostname => {
  switch (hostname.substring(0, 2).toLowerCase()) {
    case "ws" : return "workstation"
    case "ad" : return "administrator"
    default   : return "server"
  }
}

adjNoun.seed(9327561)
const nickName = () => adjNoun().join("-")

const service = hostname => {
  switch (hostname.substring(0, 2).toLowerCase()) {
    case "dc" : return "domain"
    case "ma" : return "smtp"
    case "we" : return "http"
    default   : undefined
  }
}

const constructHost = es.map((line, cb) => {
  const [ip, hostname] = line.split(/\s/)
  cb(null, {
    ip       : ipToLong(ip),
    name     : hostname.toLowerCase(),
    nickName : nickName(),
    site     : site(ip),
    type     : type(hostname),
    service  : service(hostname),
  })
})

const streamHosts = () => fs.createReadStream(FILE)
  .pipe(es.split())
  .pipe(keepData)
  .pipe(constructHost)

const insertHost = es.map((host, cb) => {
  new Host(host).save(err => {
    if (err) console.error(err)
    cb()
  })
})

const insertHosts = (hosts, done) => {
  hosts
    .pipe(insertHost)
    .pipe(es.wait((err, body) => done()))
}

mongoose.connect(URL)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  Host.remove({}, () => {
    insertHosts(streamHosts(), () => { mongoose.disconnect() })
  })
})
