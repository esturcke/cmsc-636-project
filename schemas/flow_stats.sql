DO $$
DECLARE bucket integer;
BEGIN

bucket := 60 * 5;

DROP TABLE IF EXISTS flow_stats;

CREATE TABLE flow_stats AS SELECT
  srcip,
  dstip,
  dstport,
  protocol,
  direction,
  time / bucket * bucket AS time,
  COUNT(*) AS flows,
  SUM(srctotalbytes) * 8 / 1000000.0 / bucket AS mpbs_sent,
  SUM(dsttotalbytes) * 8 / 1000000.0 / bucket AS mpbs_received,
  SUM(srcpacketcount) * 1.0 / bucket AS packet_rate_sent,
  SUM(dstpacketcount) * 1.0 / bucket AS packet_rate_received
  FROM flow 
  WHERE dstip & '0.0.0.255' != '0.0.0.255'
  GROUP BY time / bucket, srcip, dstip, dstport, protocol, direction
  ORDER BY time;

DROP INDEX IF EXISTS flow_stats_time;
CREATE INDEX flow_stats_time ON flow_stats (time);

END $$;
