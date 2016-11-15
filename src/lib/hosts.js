import { sortBy, flow, keyBy } from 'lodash/fp'

const map = require('lodash/fp/map').convert({ 'cap' : false })

const gap       = Math.PI / 180
const hostAngle = count => (2 * Math.PI - 3 * gap) / count
const position  = ({ host : { site }, i, angle }) => ({
  r : 350,
  t : i * angle + (parseInt(site) - 1) * gap,
})

const processHosts = hosts => {
  const angle = hostAngle(hosts.length)
  return flow(
    sortBy(['site', 'type', 'ip']),
    map((host, i) => ({
      ...host,
      position : position({ host, i, angle }),
      angle,
      i,
    })),
    keyBy('ip'),
  )(hosts)
}

export { processHosts }
