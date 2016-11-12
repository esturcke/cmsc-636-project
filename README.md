# VizSec Semester Project for CMSC 636 / Data Visualization

## Getting Started

### Prerequisites

  - [Node.js](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com/)
  - [Gulp](http://gulpjs.com/)
  - [Yarn](https://yarnpkg.com/) (or `npm` from Node.js)

### Setup

#### Clone repository

```
git clone git@github.com:esturcke/cmsc-636-project.git
```

#### Install Node.js Dependencies

```
yarn
```

Or using `npm`

```
npm install
```

## Data Types

### Internal hosts

| Field    | [BSON Type](https://docs.mongodb.com/v3.2/reference/bson-types/) | Abstract type | Description                                          |
| ---      | ---                                                              | ---           | ---                                                  |
| ip       | `int`                                                            | nominal       | IP Address                                           |
| name     | `string`                                                         | nominal       | Hostname                                             |
| nickName | `string`                                                         | nominal       | Short cute name                                      |
| site     | `string`                                                         | nominal       | One of 3 enterprise sites                            |
| type     | `string`                                                         | nominal       | Host type (`server`, `administrator`, `workstation`) |
| service  | `string`                                                         | nominal       | Type of service of server (`domain`, `smtp`, `http`) |
