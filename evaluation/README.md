# Evaluation

## Pros

  1. Radial layout uses space well, gives room for additional attribute encoding and places emphasis on internal hosts that matter most/we have the most data for.

## Cons

  1. A lot of clutter with the flows.
  2. Not able to see overview across time.
  3. Not able to navigate through time
  4. Position is not being used to encode anything


## Possible actions

  1. Reduce clutter
    - Distribute hosts to reduce path intersections
    - Use some form of edge bundling or non-linear edges to reduce clutter
    - Emphasize some edges over others based on severity or traffic volume
    - Implement some form of filtering to reduce edges displayed
  2. Show overview graphs
    - Create aggregated data that we can use to show a graph across the full 2 weeks, perhaps of traffic volume or IPS alerts.
  3. Allow navigation in time
    - Add a range slider to filter to a small time range.
  4. Use position to encode something
    - External hosts can encode something based on radial position to collect important hosts
    - Internal hosts could have some weight to determine order

## Revised Proposal

At a minimum we need a mechanism to see more than a fixed 100 seconds (addressing con 3). Ideally, this will be handled with a range selector tied to an overview plot of traffic rate over time or IPS alerts (2).

Along with this we would like to reduce clutter by attempting to use edge bundling if we can figure out how to do that and by arranging the hosts in a better way (1). Although this might be in conflict with reducing clutter, we would like to try and use position at least for the external hosts to encode some attribute (4).
