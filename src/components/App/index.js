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

const span = 300
const from = 1364902500

class App extends React.Component {
  state = {}

  componentDidMount() {
    fetch("http://localhost:3001/host")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
      .then(() => this.updateSpan(from))
    fetch("http://localhost:3001/flow_summary")
      .then(response => response.json())
      .then(flowSummary => this.setState({ flowSummary }))
  }

  updateSpan = (from, to = from + span) => {
    this.setState({ from, to, span })
    fetch(`http://localhost:3001/flow_stats?time=gte.${from}&time=lt.${to}`)
      .then(response => response.json())
      .then(aggregateFlows(this.state.hosts))
      .then(flows => this.setState({
        flows,
        hostStats     : hostStats(flows),
        externalHosts : externalHosts(this.state.hosts)(flows),
      }))
  }

  setShowOnly = (ip = null) => this.setState({ showOnly : ip })

  render() {
    const { hosts, externalHosts, flows, hostStats, flowSummary, from, to, showOnly } = this.state
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}>
          <FlowSummary summary={flowSummary} from={from} to={to} updateSpan={this.updateSpan}/>
          <g transform="translate(500, 500)">
            <Flows internalHosts={hosts} externalHosts={externalHosts} flows={flows} showOnly={showOnly} />
            <ExternalHosts hosts={externalHosts} setShowOnly={this.setShowOnly}/>
            <HostCircle hosts={hosts}/>
            <Traffic hosts={hosts} stats={hostStats}/>
          </g>
        </svg>
      </div>
    )
  }
}

export default App
