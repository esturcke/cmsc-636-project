import React                        from "react"
import { AutoSizer, Column, Table } from "react-virtualized"
import { filter }                   from "lodash"
import Connection                   from "~/components/formatters/Connection"
import Traffic                      from "~/components/formatters/Traffic"
import T                            from "~/lib/types"
import styles                       from "./flow-table.scss"

const timeFormat = time => new Intl.DateTimeFormat(undefined, {
  hour   : "numeric",
  minute : "numeric",
}).format(time * 1000 + 5 * 3600 * 1000)

const FlowTable = ({ flows = [], showOnly, setShowOnly }) => {
  const filtered = showOnly ? filter(flows, ({ srcip, dstip }) => srcip === showOnly || dstip === showOnly) : flows
  return (
    <div className={styles.table}><AutoSizer>{({ height, width }) => (
      <Table
        width={width}
        height={height}
        headerHeight={20}
        rowHeight={20}
        rowCount={filtered.length}
        rowGetter={({ index }) => filtered[index]}
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
          label="Source Ports"
          dataKey="source-ports"
          width={100}
          cellRenderer={({ rowData }) => <span>{rowData.srcports.sort().join(", ")}</span>}
        />
        <Column
          label="Receive"
          dataKey="receive"
          width={80}
          cellRenderer={({ rowData : { mbps_received } }) => <Traffic mbps={mbps_received}/>}
        />
        <Column
          label="Send"
          dataKey="send"
          width={80}
          cellRenderer={({ rowData : { mbps_sent } }) => <Traffic mbps={mbps_sent}/>}
        />
      </Table>
    )}</AutoSizer></div>
  )
}

FlowTable.propTypes = {
  flows       : T.array,
  showOnly    : T.string,
  setShowOnly : T.func.isRequired,
}

export default FlowTable
