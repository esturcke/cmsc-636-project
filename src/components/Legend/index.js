import React     from "react"
import * as host from "~/lib/hosts"
import styles    from "./legend.scss"

const Legend = () => (
  <div className={styles.legend}>
    <section>
      <h1>Host Types</h1>
      <ul>
        {host.kinds.map((h, i) => <li key={i}><span style={{ color : host.color(h) }}>■</span> {host.kind(h)}</li>)}
      </ul>
    </section>
  </div>
)

export default Legend
