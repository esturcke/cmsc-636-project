import React            from "react"
import HostCircle       from "~/components/HostCircle"
import { processHosts } from "~/lib/hosts"
import styles           from "./app.scss"

class App extends React.Component {
  state = {
    hosts : {},
  }

  componentDidMount() {
    fetch("http://104.251.219.221:9999/hosts")
      .then(response => response.json())
      .then(processHosts)
      .then(hosts => this.setState({ hosts }))
  }

  render() {
    return (
      <div className={styles.app}>
        <svg width={1000} height={1000}>
          <HostCircle hosts={this.state.hosts}/>
        </svg>
      </div>
    )
  }
}

export default App
