const express = require('express')
const morgan = require('morgan')('combined')
const bodyParser = require('body-parser')
const router = require('./routes').routes
const apiRouter = require('./routes').apiRoutes
// const PushBullet = require('pushbullet')
// const settings = require('./settings.json')

// settings.json example
// {
//   "pushBulletKey": "your_key_here",
//   "pusBulletChannel": "mychannel"
// }


// const pusher = new PushBullet(settings.pushBulletKey)
const app = express()

// pusher.note({ channel_tag: settings.pushBulletChannel }, 'Pannan', 'Need moar pelletz!', (err, res) => {
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

app.listen(8080, '0.0.0.0', () => console.log('Example app listening on port 8080!'))
