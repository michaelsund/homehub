const express = require('express')
const morgan = require('morgan')('combined')
const bodyParser = require('body-parser')
const router = require('./routes').routes
const apiRouter = require('./routes').apiRoutes

const app = express()

app.use(morgan)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use('/api', apiRouter)

app.listen(8080, '0.0.0.0', () => console.log('Example app listening on port 8080!'))
