import React             from "react"
import HostCircle        from "~/components/HostCircle"
import Legend            from "~/components/Legend"
import Flows             from "~/components/Flows"
import Traffic           from "~/components/Traffic"
import ExternalHosts     from "~/components/ExternalHosts"
import { processHosts }  from "~/lib/hosts"
import { externalHosts } from "~/lib/externalHosts"
import styles            from "./app.scss"

class App extends React.Component {
  state = {}

  componentDidMount() {
    //    fetch("http://104.251.219.221:9999/hosts")
    fetch("http://localhost:3001/host")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
    fetch("http://localhost:3001/flow?id=gt.0&id=lt.1000")
      .then(response => response.json())
      .then(flows => this.setState({ flows, externalHosts : externalHosts(flows) }))
  }

  render() {
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}><g transform="translate(500, 500)">
          <Flows hosts={{...this.state.hosts, ...this.state.externalHosts}} flows={this.state.flows}/>
          <ExternalHosts hosts={this.state.externalHosts}/>
          <HostCircle hosts={this.state.hosts}/>
          <Traffic hosts={this.state.hosts} flows={this.state.flows}/>
        </g></svg>
      </div>
    )
  }
}

export default App
