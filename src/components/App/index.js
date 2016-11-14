import React      from 'react'
import HostCircle from '~/components/HostCircle'
import styles     from './app.scss'

const App = () => (
  <div className={styles.app}>
    <svg width={1000} height={1000}>
      <HostCircle data={[
        [5, 20],
        [90, 14],
      ]}/>
    </svg>
  </div>
)

export default App
