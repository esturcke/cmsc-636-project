import fs                     from "fs"
import es                     from "event-stream"
import adjNoun                from "adj-noun"

const FILE = "./raw-vast-data/2013MC3AnswerSheetandDataDescriptions/BigMktNetwork.txt"

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
    default   : ""
  }
}

const construct = es.map((line, cb) => {
  const [ip, hostname] = line.split(/\s/)
  cb(null, [
    ip,                     // ip
    hostname.toLowerCase(), // name
    nickName(),             // nickname
    site(ip),               // site
    type(hostname),         // type
    service(hostname),      // service
  ].join("\t") + "\n")
})

const removeJunk = pattern => es.map((line, cb) => { line.match(pattern) ? cb() : cb(null, line) })

console.log(`COPY host (
  ip,
  name,
  nickname,
  site,
  type,
  service
) FROM STDIN NULL AS '';`)

fs.createReadStream(FILE)
  .pipe(es.split())
  .pipe(removeJunk(/^(\s*|#.*)$/))
  .pipe(construct)
  .pipe(process.stdout)
