import React      from 'react'
import HostCircle from '~/components/HostCircle'

const App = () => (
  <div>
    <svg width={400} height={400}>
      <HostCircle data={[
        [5, 20],
        [90, 14],
      ]}/>
    </svg>
  </div>
)

export default App
