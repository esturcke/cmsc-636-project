import React                                       from "react"
import { AutoSizer, Column, Table, SortDirection } from "react-virtualized"
import { get }                                     from "lodash"
import naturalSort                                 from "javascript-natural-sort"
import Connection                                  from "~/components/formatters/Connection"
import Traffic                                     from "~/components/formatters/Traffic"
import T                                           from "~/lib/types"
import styles                                      from "./flow-table.scss"

const timeFormat = time => new Intl.DateTimeFormat(undefined, {
  hour   : "numeric",
  minute : "numeric",
}).format(time * 1000 + 5 * 3600 * 1000)

const order = (dataKey, direction) => (a, b) => (direction === SortDirection.ASC ? 1 : -1) * naturalSort(get(a, dataKey), get(b, dataKey))

class FlowTable extends React.Component {
  state = { sortBy : "ip", sortDirection : SortDirection.ASC }

  sort = newSort => this.setState(newSort)

  render() {
    const { flows = [], showOnly, setShowOnly } = this.props
    const { sortBy, sortDirection } = this.state
    const data = flows
      .filter(({ srcip, dstip }) => !showOnly || showOnly === srcip || showOnly === dstip)
      .sort(order(sortBy, sortDirection))

    return (
      <div className={styles.table}><AutoSizer>{({ height, width }) => (
        <Table
          width={width}
          height={height}
          headerHeight={20}
          rowHeight={20}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          sortBy={sortBy}
          sortDirection={sortDirection}
          sort={this.sort}
        >
          <Column
            label="Time"
            dataKey="time"
            width={80}
            cellRenderer={({ rowData : { time } }) => timeFormat(time)}
          />
          <Column
            label="Connection"
            dataKey="connection"
            width={300}
            cellRenderer={({ rowData }) => <Connection {...rowData} showOnly={showOnly} setShowOnly={setShowOnly}/>}
          />
          <Column
            label="Received"
            dataKey="mbps_received"
            width={80}
            cellRenderer={({ rowData : { mbps_received } }) => <Traffic mbps={mbps_received}/>}
          />
          <Column
            label="Sent"
            dataKey="mbps_sent"
            width={80}
            cellRenderer={({ rowData : { mbps_sent } }) => <Traffic mbps={mbps_sent}/>}
          />
          <Column
            label="Source Ports"
            dataKey="source-ports"
            width={100}
            cellRenderer={({ rowData }) => <span>{rowData.srcports.sort().join(", ")}</span>}
          />
        </Table>
      )}</AutoSizer></div>
    )
  }
}

FlowTable.propTypes = {
  flows       : T.array,
  showOnly    : T.string,
  setShowOnly : T.func.isRequired,
}

export default FlowTable
