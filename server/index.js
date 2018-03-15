const express = require('express')
const morgan = require('morgan')('combined')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const router = require('./routes').routes
const apiRouter = require('./routes').apiRoutes
const remotedev = require('remotedev-server')
// const PushBullet = require('pushbullet')
// const settings = require('./settings.json')

// settings.json example
// {
//   "pushBulletKey": "your_key_here",
//   "pusBulletChannel": "mychannel"
// }

// Local remote dev server
remotedev({ hostname: 'localhost', port: 8000 });

mongoose.connect('mongodb://localhost/hut')
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

app.use(morgan)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use('/api', apiRouter)

app.listen(8080, '0.0.0.0', () => console.log('Example app listening on port 8080'))
