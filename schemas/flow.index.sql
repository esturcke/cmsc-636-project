BEGIN;

DROP INDEX IF EXISTS flow_time;
CREATE INDEX flow_time ON flow (time);

COMMIT;
