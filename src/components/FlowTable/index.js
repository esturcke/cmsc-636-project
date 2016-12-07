import React                        from "react"
import { AutoSizer, Column, Table } from "react-virtualized"
import Connection                   from "~/components/formatters/Connection"
import Traffic                      from "~/components/formatters/Traffic"
import T                            from "~/lib/types"
import styles                       from "./flow-table.scss"

const timeFormat = time => new Intl.DateTimeFormat(undefined, {
  hour   : "numeric",
  minute : "numeric",
  second : "numeric",
}).format(time * 1000 + 5 * 3600 * 1000)

const FlowTable = ({ flows = [] }) => {
  return (
    <div className={styles.table}><AutoSizer>{({ height, width }) => (
      <Table
        width={width}
        height={height}
        headerHeight={20}
        rowHeight={20}
        rowCount={flows.length}
        rowGetter={({ index }) => flows[index]}
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
          cellRenderer={({ rowData }) => <Connection {...rowData}/>}
        />
        <Column
          label="Receive"
          dataKey="receive"
          width={60}
          cellRenderer={({ rowData : { mbps_received } }) => <Traffic mbps={mbps_received}/>}
        />
        <Column
          label="Send"
          dataKey="send"
          width={60}
          cellRenderer={({ rowData : { mbps_sent } }) => <Traffic mbps={mbps_sent}/>}
        />
      </Table>
    )}</AutoSizer></div>
  )
}

FlowTable.propTypes = {
  flows : T.array,
}

export default FlowTable
