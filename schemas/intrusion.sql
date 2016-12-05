BEGIN;

DROP TABLE IF EXISTS intrusion CASCADE;
DROP TYPE IF EXISTS operation CASCADE;
DROP TYPE IF EXISTS priority CASCADE;

CREATE TYPE operation AS ENUM ('deny', 'built', 'teardown');
CREATE TYPE priority  AS ENUM ('info', 'warning');

CREATE TABLE intrusion (
  id              serial PRIMARY KEY,
  time            integer   NOT NULL,
  protocol        protocol  NOT NULL,
  srcIp           inet      NOT NULL,
  srcPort         integer   NOT NULL,
  dstIp           inet      NOT NULL,
  dstPort         integer   NOT NULL,
  direction       direction NOT NULL,
  service         text      NOT NULL,
  priority        priority  NOT NULL,
  operation       operation NOT NULL,
  messageCode     text      NOT NULL,
  flags           text      NOT NULL
);

COMMIT;
