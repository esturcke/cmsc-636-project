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
