import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import routes from './routes/routes'
import apiRoutes from './routes/apiRoutes'
// import remotedev from 'remotedev-server'
// import PushBullet from 'pushbullet'
import settings from './settings.json'

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
const app = express()
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// pusher.note({
//  channel_tag: settings.pushBulletChannel
// }, 'Pannan', 'Need moar pelletz!', (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(res)
//   }
// })

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)
app.use('/api', apiRoutes)

app.listen(8080, '0.0.0.0', () => console.log('Example app listening on port 8080'))
