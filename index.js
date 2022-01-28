import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import routes from './routes'
import logger from './logger'
import mongoLogPlugin from './plugin/mongo-log-plugin'

require('dotenv').config()

const app = express()
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

// mongoose.connect('mongodb://<HOSTNAME>:27017,<HOSTNAME>:27018,<HOSTNAME>:27019/<DBNAME>', {
//   useNewUrlParser : true,
//   useFindAndModify: false, // optional
//   useCreateIndex  : true,
//   replicaSet      : 'rs0', // We use this from the entrypoint in the docker-compose file
// })

mongoose.plugin(mongoLogPlugin)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.enable('etag')

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
app.use(morgan('combined', { stream: logger.stream }))

// add routes
routes(app)

app.listen(process.env.API_PORT, () => console.log(`server started on port: ${process.env.API_PORT}`))