DO $$
DECLARE bucket integer;
BEGIN

bucket := 60 * 1;

DROP TABLE IF EXISTS intrusion_stats;

CREATE TABLE intrusion_stats AS SELECT
  srcip,
  dstip,
  ARRAY_AGG(DISTINCT srcport ORDER BY srcport) AS srcports,
  dstport,
  protocol,
  direction,
  time / bucket * bucket AS time,
  COUNT(*) AS events,
  COUNT(CASE WHEN operation = 'deny' THEN 1 END) AS deny_events
  FROM intrusion 
  WHERE dstip & '0.0.0.255' != '0.0.0.255'
  GROUP BY time / bucket, srcip, dstip, dstport, protocol, direction
  ORDER BY time;

DROP INDEX IF EXISTS intrusion_stats_time;
CREATE INDEX intrusion_stats_time ON intrusion_stats (time);

END $$;
