import React                        from "react"
import { AutoSizer, Column, Table } from "react-virtualized"
import { get }                      from "lodash"
import { naturalSort }              from "javascript-natural-sort"
import T                            from "~/lib/types"
import styles                       from "./host-table.scss"

const HostTable = ({ hosts = {}, hostStats = {} }) => {
  const ips = Object.keys(hosts).sort(naturalSort)
  return (
    <div className={styles.table}><AutoSizer>{({ height, width }) => (
      <Table
        width={width}
        height={height}
        headerHeight={20}
        rowHeight={20}
        rowCount={ips.length}
        rowGetter={({ index }) => ({ ...hostStats[ips[index]], ...hosts[ips[index]] })}
      >
        <Column
          label="IP"
          dataKey="ip"
          width={100}
        />
        <Column
          label="Traffic In"
          dataKey="traffic-in"
          cellRenderer={({ rowData }) => get(rowData, "traffic.in", 0).toLocaleString(undefined, { maximumSignificantDigits: 2 })}
          width={100}
        />
        <Column
          label="Traffic Out"
          dataKey="traffic-out"
          cellRenderer={({ rowData }) => get(rowData, "traffic.out", 0).toLocaleString(undefined, { maximumSignificantDigits: 2 })}
          width={100}
        />
      </Table>
    )}</AutoSizer></div>
  )
}

HostTable.propTypes = {
  hosts     : T.host,
  hostStats : T.object,
}

export default HostTable