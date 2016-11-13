import React from 'react'

const renderCircles = (props) => {
  return (coords, index) => {
    const circleProps = {
      cx: coords[0],
      cy: coords[1],
      r: 2,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

const HostCircle = (props) => {
  return <g>{props.data.map(renderCircles(props))}</g>
}

export default HostCircle
