# VizSec Semester Project for CMSC 636 / Data Visualization

## Getting Started

### Prerequisites

  - [Node.js](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com/)
  - [Yarn](https://yarnpkg.com/)

### Setup

#### Clone Repository

```
git clone git@github.com:esturcke/cmsc-636-project.git
```

#### Install Node.js Dependencies

```
yarn
```

#### Download VAST Data

To download and extract the raw VAST data to `raw-vast-data` run:

```
bin/fetch-vast-data
```

#### Process and Populate MongoDB

First start MongoDB

```
yarn run mongo
```

Then process data

```
yarn run process-host-data
```

#### Start the REST API

First start MongoDB

```
yarn run mongo
```

Then start the REST API

```
yarn run rest-api
```

## Data Types

### Internal hosts

| Field    | [BSON Type](https://docs.mongodb.com/v3.2/reference/bson-types/) | Abstract type | Description                                          |
| ---      | ---                                                              | ---           | ---                                                  |
| ip       | `int`                                                            | nominal       | IPv4 Address                                         |
| name     | `string`                                                         | nominal       | Hostname                                             |
| nickName | `string`                                                         | nominal       | Short cute name                                      |
| site     | `string`                                                         | nominal       | One of 3 enterprise sites                            |
| type     | `string`                                                         | nominal       | Host type (`server`, `administrator`, `workstation`) |
| service  | `string`                                                         | nominal       | Type of service of server (`domain`, `smtp`, `http`) |

### Netflow

| Field           | [BSON Type](https://docs.mongodb.com/v3.2/reference/bson-types/) | Abstract type | Description                 |
| ---             | ---                                                              | ---           | ---                         |
| time            | `date`                                                           | interval      | Time of final packet        |
| protocol        | `string`                                                         | nominal       | Protocol (`tcp`, `udp`)     |
| srcIp           | `int`                                                            | nominal       | Source IPv4 Address         |
| srcPort         | `int`                                                            | nominal       | Source Port                 |
| dstIp           | `int`                                                            | nominal       | Destination IPv4 Address    |
| dstPort         | `int`                                                            | nominal       | Destination Port            |
| duration        | `int`                                                            | ratio         | Session duration in seconds |
| srcPayloadBytes | `int`                                                            | ratio         | Payload bytes sent          |
| srcTotalBytes   | `int`                                                            | ratio         | Payload bytes received      |
| dstPayloadBytes | `int`                                                            | ratio         | Total bytes sent            |
| dstTotalBytes   | `int`                                                            | ratio         | Total bytes received        |
| srcPacketCount  | `int`                                                            | ratio         | Packets sent                |
| dstPacketCount  | `int`                                                            | ratio         | Packets received            |
| forcedOut       | `string`                                                         | nominal       | ?                           |
