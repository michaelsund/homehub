import express from 'express'
// import bodyParser from 'body-parser'
import path from 'path'
// import cors from 'cors'
// import { createServer } from 'http'
// import { execute, subscribe } from 'graphql'
// import { ApolloServer } from 'apollo-server-express'
// import morgan from 'morgan'
// import remotedev from 'remotedev-server'
// import PushBullet from 'pushbullet'
import mongoose from 'mongoose'
import { GraphQLServer } from 'graphql-yoga'
import settings from '../client/src/settings.json'
// import apiRoutes from './routes/apiRoutes'
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import sensorEvents from './helpers/sensorEvents'
import checkSensorMaxAge from './helpers/checkSensorMaxAge'
import checkControllerTimer from './helpers/checkControllerTimer'
import checkServerStatuses from './helpers/checkServerStatuses'
import { tradfriEvents } from './helpers/tradfriHelpers'

// Local remote dev server
// remotedev({ hostname: 'localhost', port: 8000 });

if (settings.mongoUser === '') {
  mongoose.connect(
    `mongodb://${settings.mongoServer}:27017/hut`,
    {
      reconnectTries: 900,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
} else {
  mongoose.connect(
    `mongodb://${settings.mongoUser}:${settings.mongoPass}@${settings.mongoServer}:27017/hut`,
    {
      reconnectTries: 900,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to db!'))

// const pusher = new PushBullet(settings.pushBulletKey)
// pusher.note({
//  channel_tag: settings.pushBulletChannel
// }, 'Pannan', 'Need moar pelletz!', (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(res)
//   }
// })

// const app = express()

// Start checks
checkSensorMaxAge()
sensorEvents()
checkControllerTimer()
checkServerStatuses()
// Test
tradfriEvents()

const options = {
  port: 5000,
  endpoint: '/graphql',
  playground: '/graphiql'
}

const server = new GraphQLServer({ schema, resolvers })
// server.express.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// server.express.use(cors())
// server.express.use(bodyParser.urlencoded({ extended: true }))
// server.express.use(bodyParser.json())
server.express.use(express.static(path.resolve(__dirname, 'build')))
// server.express.use('/api', apiRoutes)

// Redirect everything under root to react router

server.start(options, () => console.log('Server is running on localhost:5000'))
