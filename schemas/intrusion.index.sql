BEGIN;

DROP INDEX IF EXISTS intrusion_time;
DROP INDEX IF EXISTS intrusion_operation;
DROP INDEX IF EXISTS intrusion_priority;

CREATE INDEX intrusion_time      ON intrusion (time);
CREATE INDEX intrusion_operation ON intrusion (operation);
CREATE INDEX intrusion_priority  ON intrusion (priority);

COMMIT;
