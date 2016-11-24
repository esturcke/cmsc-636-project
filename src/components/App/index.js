import React              from "react"
import HostCircle         from "~/components/HostCircle"
import Legend             from "~/components/Legend"
import Flows              from "~/components/Flows"
import Traffic            from "~/components/Traffic"
import ExternalHosts      from "~/components/ExternalHosts"
import { processHosts }   from "~/lib/hosts"
import { hostStats }      from "~/lib/hostStats"
import { externalHosts }  from "~/lib/externalHosts"
import { aggregateFlows } from "~/lib/aggregateFlows"
import styles             from "./app.scss"

/*
const minTime = 1366020001
const maxTime = 1364802616
*/


const span = 120
const from = 1364902616
const to   = from + span

const mbps = seconds => bytes => bytes * 8 / 1000000 / seconds

class App extends React.Component {
  state = { from, to, span }

  componentDidMount() {
    fetch("http://localhost:3001/host")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
    fetch(`http://localhost:3001/flow?time=gt.${from}&time=lt.${to}`)
      .then(response => response.json())
      .then(aggregateFlows(mbps(span)))
      .then(flows => this.setState({
        flows,
        hostStats     : hostStats(mbps(span))(flows),
        externalHosts : externalHosts(flows),
      }))
  }

  render() {
    const { hosts, externalHosts, flows, hostStats } = this.state
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}><g transform="translate(500, 500)">
          <Flows hosts={{...hosts, ...externalHosts}} flows={flows}/>
          <ExternalHosts hosts={externalHosts}/>
          <HostCircle hosts={hosts}/>
          <Traffic hosts={hosts} stats={hostStats}/>
        </g></svg>
      </div>
    )
  }
}

export default App
