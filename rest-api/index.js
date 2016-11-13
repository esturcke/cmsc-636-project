import express        from 'express'
import bodyParser     from 'body-parser'
import methodOverride from 'method-override'
import morgan         from 'morgan'
import restful        from 'node-restful'
import compression    from 'compression'
import { each }       from 'lodash'
import * as models    from '~/model'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended' : 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type : 'application/vnd.api+json' }))
app.use(methodOverride())
app.use(compression())
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", url.format(appHostInfo))

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next()
})

const mongoose = restful.mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/test")

const isBulk = ({ params : { id } }) => !id
const parseQuery = (req, res, next) => {
  if (isBulk(req)) {
    if (req.query.skip)   req.query.skip  = parseInt(req.query.skip)
    if (req.query.limit)  req.query.limit = parseInt(req.query.limit)
    if (!req.query.limit) req.query.limit = 10000
  }
  next()
}

const register = ({ modelName, schema, collection }) => {
  const Resource = restful.model(modelName, schema).methods(['get'])
  Resource.before('get', parseQuery)
  Resource.register(app, `/${collection.name}`)
}

each(models, register)
app.listen(9999)
