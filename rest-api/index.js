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

const mongoose = restful.mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/test")

const isBulk = ({ params : { id } }) => !id
const parseQuery = (req, res, next) => {
  if (isBulk(req)) {
    if (req.query.skip)  req.query.skip  = parseInt(req.query.skip)
    if (req.query.limit) req.query.limit = parseInt(req.query.limit)
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
