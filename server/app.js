import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import graphqlHTTP from 'express-graphql'
// import morgan from 'morgan'
// import remotedev from 'remotedev-server'
import apiRoutes from './routes/apiRoutes'

// import PushBullet from 'pushbullet'
import settings from '../client/src/settings.json'
import schema from './graphql'
import sensorEvents from './helpers/sensorEvents'
import checkSensorMaxAge from './helpers/checkSensorMaxAge'
import checkControllerTimer from './helpers/checkControllerTimer'
import checkServerStatuses from './helpers/checkServerStatuses'

// Local remote dev server
// remotedev({ hostname: 'localhost', port: 8000 });

if (settings.mongoUser === '') {
  mongoose.connect(`mongodb://${settings.mongoServer}/hut`)
} else {
  mongoose.connect(`mongodb://${settings.mongoUser}:${settings.mongoPass}@${settings.mongoServer}/hut`)
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

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'build')))
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', apiRoutes)
app.use('/graphql', graphqlHTTP(() => ({
  schema,
  pretty: true,
  graphiql: true
})))
// Redirect everything under root to react router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Start checks
checkSensorMaxAge()
sensorEvents()
checkControllerTimer()
checkServerStatuses()

app.listen(5000, '0.0.0.0', () => console.log('Listening on port 5000'))
