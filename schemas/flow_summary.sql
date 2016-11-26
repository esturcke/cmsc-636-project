DO $$
DECLARE bucket integer;
BEGIN

bucket := 60 * 10;

DROP TABLE IF EXISTS flow_summary;

CREATE TABLE flow_summary AS SELECT
  time / bucket * bucket AS time,
  SUM(CASE WHEN direction = 'inbound'  THEN 1 ELSE 0 END) AS connections_inbound,
  SUM(CASE WHEN direction = 'outbound' THEN 1 ELSE 0 END) AS connections_outbound,
  SUM(CASE WHEN direction = 'internal' THEN 1 ELSE 0 END) AS connections_internal,
  SUM(
    CASE WHEN direction = 'inbound'  THEN srctotalbytes
         WHEN direction = 'outbound' THEN dsttotalbytes
         ELSE 0
    END
  ) * 8 / 1000000.0 / bucket AS mbps_inbound,
  SUM(
    CASE WHEN direction = 'outbound' THEN srctotalbytes
         WHEN direction = 'inbound'  THEN dsttotalbytes
         ELSE 0
    END
  ) * 8 / 1000000.0 / bucket AS mbps_outbound,
  SUM(
    CASE WHEN direction = 'outbound' THEN 0
         WHEN direction = 'inbound'  THEN 0
         ELSE srctotalbytes + dsttotalbytes
    END
  ) * 8 / 1000000.0 / bucket AS mbps_internal,
  SUM(
    CASE WHEN direction = 'inbound'  THEN srcpacketcount
         WHEN direction = 'outbound' THEN dstpacketcount
         ELSE 0
    END
  ) / 1.0 / bucket AS packet_rate_inbound,
  SUM(
    CASE WHEN direction = 'outbound' THEN srcpacketcount
         WHEN direction = 'inbound'  THEN dstpacketcount
         ELSE 0
    END
  ) / 60.0 / 10.0 AS packet_rate_outbound,
  SUM(
    CASE WHEN direction = 'outbound' THEN 0
         WHEN direction = 'inbound'  THEN 0
         ELSE srcpacketcount + dstpacketcount
    END
  ) / 1.0 / bucket AS packet_rate_internal
  FROM flow 
  GROUP BY time / bucket
  ORDER BY time;

END $$;
