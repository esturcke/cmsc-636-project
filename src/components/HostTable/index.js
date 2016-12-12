import React                                       from "react"
import { AutoSizer, Column, Table, SortDirection } from "react-virtualized"
import { get, values, map }                        from "lodash"
import naturalSort                                 from "javascript-natural-sort"
import Traffic                                     from "~/components/formatters/Traffic"
import T                                           from "~/lib/types"
import styles                                      from "./host-table.scss"

const order = (dataKey, direction) => (a, b) => (direction === SortDirection.ASC ? 1 : -1) * naturalSort(get(a, dataKey), get(b, dataKey))

class HostTable extends React.Component {
  state = { sortBy : "ip", sortDirection : SortDirection.ASC }

  sort = newSort => this.setState(newSort)

  render() {
    const { hosts = {}, hostStats = {} } = this.props
    const { sortBy, sortDirection } = this.state
    const data = map(values(hosts), host => ({ ...hostStats[host.ip], ...host })).sort(order(sortBy, sortDirection))

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
            label="IP"
            dataKey="ip"
            width={100}
          />
          <Column
            label="Traffic In"
            dataKey="traffic.in"
            cellRenderer={({ rowData }) => <Traffic mbps={get(rowData, "traffic.in", 0)}/>}
            width={100}
          />
          <Column
            label="Traffic Out"
            dataKey="traffic.out"
            cellRenderer={({ rowData }) => <Traffic mbps={get(rowData, "traffic.out", 0)}/>}
            width={100}
          />
        </Table>
      )}</AutoSizer></div>
    )
  }
}

HostTable.propTypes = {
  hosts     : T.object,
  hostStats : T.object,
}

export default HostTable
