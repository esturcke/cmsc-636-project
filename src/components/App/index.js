import React             from "react"
import HostCircle        from "~/components/HostCircle"
import Legend            from "~/components/Legend"
import Flows             from "~/components/Flows"
import ExternalHosts     from "~/components/ExternalHosts"
import { processHosts }  from "~/lib/hosts"
import { externalHosts } from "~/lib/externalHosts"
import styles            from "./app.scss"

class App extends React.Component {
  state = {}

  componentDidMount() {
    //    fetch("http://104.251.219.221:9999/hosts")
    fetch("http://localhost:9999/hosts")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
    fetch("http://localhost:9999/netflows?limit=1000")
      .then(response => response.json())
      .then(flows => this.setState({ flows, externalHosts : externalHosts(flows) }))
  }

  render() {
    return (
      <div className={styles.app}>
        <Legend/>
        <svg width={1000} height={1000}><g transform="translate(500, 500)">
          <ExternalHosts hosts={this.state.externalHosts}/>
          <Flows hosts={this.state.hosts} flows={this.state.flows}/>
          <HostCircle hosts={this.state.hosts}/>
        </g></svg>
      </div>
    )
  }
}

export default App
