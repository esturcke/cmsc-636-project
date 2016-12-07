import React              from "react"
import Select             from "react-select"
import HostCircle         from "~/components/HostCircle"
import Legend             from "~/components/Legend"
import Flows              from "~/components/Flows"
import Traffic            from "~/components/Traffic"
import ExternalHosts      from "~/components/ExternalHosts"
import FlowSummary        from "~/components/FlowSummary"
import HostTable          from "~/components/HostTable"
import { processHosts }   from "~/lib/hosts"
import { hostStats }      from "~/lib/hostStats"
import { externalHosts }  from "~/lib/externalHosts"
import { aggregateFlows } from "~/lib/aggregateFlows"
import T                  from "~/lib/types"
import styles             from "./app.scss"

const span = 60
const from = 1364902500
const host = location.hostname

const Loading = ({ loading }) => loading ? <div className={styles.loading}>Loading</div> : null

Loading.propTypes = {
  loading : T.bool.isRequired,
}

class App extends React.Component {
  state = { loading : true }

  componentDidMount() {
    Promise.all([
      fetch(`http://${host}:3001/host`)
        .then(response => response.json())
        .then(processHosts)
        .then(hosts => this.setState({ hosts }))
        .then(() => this.updateSpan(from)),
      fetch(`http://${host}:3001/flow_summary`)
        .then(response => response.json())
        .then(flowSummary => this.setState({ flowSummary })),
      fetch(`http://${host}:3001/intrusion_summary`)
        .then(response => response.json())
        .then(intrusionSummary => this.setState({ intrusionSummary })),
    ]).then(() => this.setState({ loading : false }))
  }

  updateSpan = (from, to = from + span) => {
    this.setState({ from, to, span : to - from, loading : true })
    fetch(`http://${host}:3001/flow_stats?time=gte.${from}&time=lt.${to}`)
      .then(response => response.json())
      .then(aggregateFlows(this.state.hosts))
      .then(flows => this.setState({
        flows,
        hostStats     : hostStats(flows),
        externalHosts : externalHosts(this.state.hosts)(flows),
      }))
      .then(() => this.setState({ loading : false }))
  }

  setShowOnly = (ip = null) => this.setState({ showOnly : ip })

  render() {
    const { hosts, externalHosts, flows, hostStats, flowSummary, intrusionSummary, from, to, span, showOnly, loading } = this.state
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}>
          <FlowSummary flows={flowSummary} intrusions={intrusionSummary} from={from} to={to} updateSpan={this.updateSpan}/>
          <g transform="translate(500, 530)">
            <Flows internalHosts={hosts} externalHosts={externalHosts} flows={flows} showOnly={showOnly} />
            <ExternalHosts hosts={externalHosts} setShowOnly={this.setShowOnly}/>
            <HostCircle hosts={hosts}/>
            <Traffic hosts={hosts} stats={hostStats}/>
          </g>
        </svg>
        <Select
          className={styles.spanSelect}
          options={[
            { value :   60, label : "1 minute" },
            { value :  300, label : "5 minutes" },
            { value :  600, label : "10 minutes" },
            { value : 1200, label : "20 minutes" },
            { value : 1800, label : "30 minutes" },
            { value : 3600, label : "1 hour" },
          ]}
          value={span}
          clearable={false}
          onChange={({ value }) => this.updateSpan(from, from + value)}
        />
        <div className={styles.tables}>
          <HostTable hosts={hosts} hostStats={hostStats}/>
        </div>
        <Loading loading={loading}/>
      </div>
    )
  }
}

export default App
