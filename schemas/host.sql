BEGIN;

DROP TABLE host;
DROP TYPE enterpriseSite;
DROP TYPE hostType;
DROP TYPE serverService;

CREATE TYPE enterpriseSite AS ENUM ('1', '2', '3');
CREATE TYPE hostType AS ENUM ('workstation', 'administrator', 'server');
CREATE TYPE serverService AS ENUM ('http', 'smtp', 'domain');

CREATE TABLE host (
  ip       inet PRIMARY KEY,
  name     text           NOT NULL,
  nickName text           NOT NULL,
  site     enterpriseSite NOT NULL,
  type     hostType       NOT NULL,
  service  serverService
);

COMMIT;
