import React              from "react"
import HostCircle         from "~/components/HostCircle"
import Legend             from "~/components/Legend"
import Flows              from "~/components/Flows"
import Traffic            from "~/components/Traffic"
import ExternalHosts      from "~/components/ExternalHosts"
import FlowSummary        from "~/components/FlowSummary"
import { processHosts }   from "~/lib/hosts"
import { hostStats }      from "~/lib/hostStats"
import { externalHosts }  from "~/lib/externalHosts"
import { aggregateFlows } from "~/lib/aggregateFlows"
import styles             from "./app.scss"

/*
const minTime = 136602000q
const maxTime = 1364802616
*/

const span = 300
const from = 1364902500
const to   = from + span

class App extends React.Component {
  state = { from, to, span }

  componentDidMount() {
    fetch("http://localhost:3001/host")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
    fetch("http://localhost:3001/flow_summary")
      .then(response => response.json())
      .then(flowSummary => this.setState({ flowSummary }))
    fetch(`http://localhost:3001/flow_stats?time=gte.${from}&time=lt.${to}`)
      .then(response => response.json())
      .then(aggregateFlows)
      .then(flows => this.setState({
        flows,
        hostStats     : hostStats(flows),
        externalHosts : externalHosts(flows),
      }))
  }

  render() {
    const { hosts, externalHosts, flows, hostStats, flowSummary } = this.state
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}>
          <FlowSummary summary={flowSummary} from={from} to={to}/>
          <g transform="translate(500, 500)">
            <Flows hosts={{...hosts, ...externalHosts}} flows={flows}/>
            <ExternalHosts hosts={externalHosts}/>
            <HostCircle hosts={hosts}/>
            <Traffic hosts={hosts} stats={hostStats}/>
          </g>
        </svg>
      </div>
    )
  }
}

export default App
