const express = require('express')
const db = require('../schema')
const WebSocket = require('ws')
const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');

const apiRouter = express.Router()
const wss = new WebSocket.Server({ port: 40510 })

// We intend to only use websockets on stuff from api.
wss.on('connection', ws => {
  ws.on('message', message => {
    // TODO: Verify its a valid message! to prevent spam
    wss.clients.forEach(client => {
      // Send to everyone
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  })
  ws.on('error', () => {});
})

apiRouter.get('/sensors', (req, res) => {
  db.Sensor.find({}, (err, sensors) => {
    if (err) {
      console.log(err)
    }
    res.json({ success: true, status: 'Fetched all sensors.', sensors })
  })
})

apiRouter.post('/sensor', [
  check('sensorId').exists().isLength({ min: 1 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.mapped() });
  } else {
    db.Sensor.find({ _id: req.body.sensorId }, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.json({ success: true, status: 'Sensor fetched', sensor: data[0] })
    })
  }
})

apiRouter.post('/newsensor', [
  check('name').exists().isLength({ min: 1 }).trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.mapped() });
  } else {
    const newSensor = new db.Sensor({
      name: req.body.name,
      description: req.body.description || '',
      measurementType: req.body.measurementType || '',
      measurementUnit: req.body.measurementUnit || '',
      external: req.body.external || true,
      maxAge: req.body.maxAge || null,
      maxAgeAlarm: req.body.maxAgeAlarm || false,
      maxAgeAlarmActive: req.body.maxAgeAlarmActive || false,
      maxAgeAlarmManualReset: req.body.maxAgeAlarmManualReset || false,
      maxValueAlarm: req.body.maxValueAlarm || false,
      maxValueAlarmActive: req.body.maxValueAlarmActive || false,
      maxValue: req.body.maxValue || null,
      minValueAlarm: req.body.minValueAlarm || false,
      minValueAlarmActive: req.body.minValueAlarmActive || false,
      minValue: req.body.minValue || null,
    })
    newSensor.save((err, data) => {
      if (err) {
        console.log(err)
      }
      res.json({ success: true, status: 'New sensor created', _id: data._id || 'no _id found' })
    })
  }
})

apiRouter.post('/updatesensor', () => {
  // TODO: The post should contains the current data, new and old.
  // Should be safe to just update everything from body.
})

apiRouter.post('/delsensor', (req, res) => {
  if (req.body.sensorId) {
    db.Sensor.findOne({ _id: req.body.sensorId }, (err, sensor) => {
      if (sensor) {
        db.Sensor.remove({ _id: req.body.sensorId }, () =>
          db.SensorValue.remove({ sensorId: req.body.sensorId }, () =>
            res.json({ success: true, status: 'Sensor deleted.' })))
      } else {
        res.json({ success: false, status: 'Cannot delete sensor.' })
      }
    })
  }
})

// TODO: Logic needed for triggering alarms and such, this is for external sensors posting in.
apiRouter.post('/newsensorvalue', (req, res) => {
  if (req.body.sensorId && req.body.value) {
    // Check if the sensorId correlates with a Sensor
    db.Sensor.findOne({ _id: req.body.sensorId }, (err, sensor) => {
      if (sensor) {
        const newSensorValue = db.SensorValue({
          sensorId: req.body.sensorId,
          value: req.body.value,
          time: new Date()
        })
        newSensorValue.save(err => {
          if (!err) {
            // Update the sensors latest value and time
            sensor.update({
              lastReportedValue: req.body.value,
              lastReportedTime: new Date()
            }, () => {
              // Update websocket client with the new value
              wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type: 'NEW_SENSOR_VALUE', newSensorValue }))
                }
              })
              res.json({ success: true, status: 'Sensor value saved' })
            })
          } else {
            res.json({ success: false, status: 'Error saving new sensor value' })
          }
        })
      } else {
        console.log(err)
        res.json({ success: false, status: 'Sensor with that id could not be found.' })
      }
    })
  } else {
    res.json({ success: false, status: 'Incorrect data supplied for new sensor value.' })
  }
})

// Sensorvalues GET version /api/sensorvalues/?sensorId=blabla?daysback
apiRouter.get('/sensorvalues', (req, res) => {
  if (req.query.sensorId) {
    db.SensorValue.find({ sensorId: req.query.sensorId }, (err, data) => {
      if (err) {
        console.log(err)
      }
      res.json({ success: true, status: 'Values for sensor', data })
    })
  } else {
    res.json({ success: false, status: 'Incorrect data supplied.' })
  }
})

// Sensorvalues POST version
apiRouter.post('/sensorvalues', (req, res) => {
  if (req.body.sensorId) {
    db.SensorValue.find({ sensorId: req.body.sensorId }, (err, data) => {
      if (err) {
        console.log(err)
      }
      res.json({ success: true, status: 'Values for sensor', data })
    })
  } else {
    res.json({ success: false, status: 'Incorrect data supplied.' })
  }
})

module.exports = apiRouter
