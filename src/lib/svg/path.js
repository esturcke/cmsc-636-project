import { cartesian } from '~/lib/coordinates'

const point = p => {
  const { x, y } = cartesian(p)
  return `${x},${y}`
}

const path = ({ from }) => {
  const self = { d : 'M' + point(from) }

  self.move = ({ to }) => {
    self.d += 'M' + point(to)
    return self
  }

  self.line = ({ to }) => {
    self.d += 'L' + point(to)
    return self
  }

  self.arc = ({ to, radius, largeArc, clockwise }) => {
    self.d += `A${radius},${radius} 0 ${largeArc ? 1 : 0} ${clockwise ? 1 : 0} ${point(to)}`
    return self
  }

  return self
}

export default path
