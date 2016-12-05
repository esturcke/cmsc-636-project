DO $$
DECLARE bucket integer;
BEGIN

bucket := 60 * 10;

DROP TABLE IF EXISTS intrusion_summary;

CREATE TABLE intrusion_summary AS SELECT
  time / bucket * bucket AS time,
  COUNT(*) AS events,
  COUNT(CASE WHEN operation = 'deny' THEN 1 END) AS deny_events
  FROM intrusion 
  GROUP BY time / bucket
  ORDER BY time;

END $$;
