import express        from 'express'
import bodyParser     from 'body-parser'
import methodOverride from 'method-override'
import morgan         from 'morgan'
import restful        from 'node-restful'
import { each }       from 'lodash'
import * as models    from '~/model'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended' : 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type : 'application/vnd.api+json' }))
app.use(methodOverride())

const mongoose = restful.mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/test")

const register = ({ modelName, schema, collection }) => {
  const Resource = restful.model(modelName, schema).methods(['get'])
  Resource.register(app, `/${collection.name}`)
}

each(models, register)
app.listen(9999)
