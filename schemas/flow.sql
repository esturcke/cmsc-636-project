BEGIN;

DROP TABLE flow;
DROP TYPE protocol;

CREATE TYPE protocol AS ENUM ('tcp', 'udp', 'icmp');

CREATE TABLE flow (
  id              serial PRIMARY KEY,
  time            integer   NOT NULL,
  protocol        protocol  NOT NULL,
  srcIp           inet      NOT NULL,
  srcPort         integer   NOT NULL,
  dstIp           inet      NOT NULL,
  dstPort         integer   NOT NULL,
  moreFragment    integer   NOT NULL,
  contFragment    integer   NOT NULL,
  duration        integer   NOT NULL,
  srcPayloadBytes integer   NOT NULL,
  srcTotalBytes   integer   NOT NULL,
  dstPayloadBytes integer   NOT NULL,
  dstTotalBytes   integer   NOT NULL,
  srcPacketCount  integer   NOT NULL,
  dstPacketCount  integer   NOT NULL,
  forcedOut       integer   NOT NULL
);

COMMIT;
