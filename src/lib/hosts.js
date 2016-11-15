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
  type    === "administrator" ? "rgb(211,124,230)" :
  type    === "workstation"   ? "rgb(94,191,114)"  :
  service === "http"          ? "rgb(234,152,90)"  :
  service === "smtp"          ? "rgb(157,151,211)" :
  service === "domain"        ? "rgb(245,92,113)"  : "black"

const kind = ({ type, service }) =>
  type    === "administrator" ? "Administrator"     :
  type    === "workstation"   ? "Workstation"       :
  service === "http"          ? "Web server"        :
  service === "smtp"          ? "Mail server"       :
  service === "domain"        ? "Domain controller" : "black"

export { processHosts, color, kind }
