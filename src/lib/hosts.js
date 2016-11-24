import { sortBy, flow, keyBy } from "lodash/fp"

const map = require("lodash/fp/map").convert({ "cap" : false })

const gap       = Math.PI / 180
const hostAngle = count => (2 * Math.PI - 3 * gap) / count
const position  = ({ host : { site }, i, angle }) => ({
  r : 350,
  t : i * angle + (parseInt(site) - 1) * gap,
})

const processHosts = hosts => {
  const angle = hostAngle(hosts.length)
  return flow(
    sortBy(["site", "type", "ip"]),
    map((host, i) => ({
      ...host,
      position : position({ host, i, angle }),
      angle,
      i,
    })),
    keyBy("ip"),
  )(hosts)
}

const color = ({ type, service }) =>
  type    === "administrator" ? "hsl(265,  31%, 76%)" :
  type    === "workstation"   ? "hsl(120,  41%, 64%)" :
  service === "http"          ? "hsl( 29,  97%, 76%)" :
  service === "smtp"          ? "hsl(214,  78%, 64%)" :
  service === "domain"        ? "hsl(343, 100%, 72%)" : "black"

const kind = ({ type, service }) =>
  type    === "administrator" ? "Administrator"     :
  type    === "workstation"   ? "Workstation"       :
  service === "http"          ? "Web server"        :
  service === "smtp"          ? "Mail server"       :
  service === "domain"        ? "Domain controller" : "black"

const kinds = [
  { type    : "administrator" },
  { type    : "workstation"   },
  { service : "http"          },
  { service : "smtp"          },
  { service : "domain"        },
]

export { processHosts, color, kind, kinds }
