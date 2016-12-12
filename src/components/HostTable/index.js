import React                                       from "react"
import { AutoSizer, Column, Table, SortDirection } from "react-virtualized"
import { get, values, map }                        from "lodash"
import classNames                                  from "classnames"
import naturalSort                                 from "javascript-natural-sort"
import Traffic                                     from "~/components/formatters/Traffic"
import T                                           from "~/lib/types"
import { kind }                                    from "~/lib/hosts"
import styles                                      from "./host-table.scss"

const order = (dataKey, direction) => (a, b) => (direction === SortDirection.ASC ? 1 : -1) * naturalSort(get(a, dataKey), get(b, dataKey))

class HostTable extends React.Component {
  state = { sortBy : "ip", sortDirection : SortDirection.ASC }

  sort = newSort => this.setState(newSort)

  render() {
    const { hosts = {}, hostStats = {}, showOnly, setShowOnly } = this.props
    const { sortBy, sortDirection } = this.state
    const data = map(values(hosts), host => ({
      ...hostStats[host.ip],
      ...host,
      kind : kind(host),
    }))
    .filter(host => get(host, "traffic.in") || get(host, "traffic.out"))
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
            label="IP"
            dataKey="ip"
            cellRenderer={({ cellData }) => <span className={classNames(styles.host, { [styles.selected] : cellData === showOnly })} onClick={() => setShowOnly(cellData === showOnly ? null : cellData)}>{cellData}</span>}
            width={100}
          />
          <Column
            label="Type"
            dataKey="kind"
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
  hosts       : T.object,
  hostStats   : T.object,
  setShowOnly : T.func.isRequired,
  showOnly    : T.string,
}

export default HostTable
