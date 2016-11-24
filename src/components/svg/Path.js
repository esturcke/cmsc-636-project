import React from "react"
import T     from "~/lib/types"

const Path = ({ d, pathLength, ...props }) => <path d={d} pathLength={pathLength} {...props}/>

Path.propTypes = {
  d          : T.string.isRequired,
  pathLength : T.number,
  ...T.globalTypes,
}

export default Path
