const express = require('express')
const db = require('../schema')

const apiRouter = express.Router()

apiRouter.get('/sensors', (req, res) => {
  db.Sensor.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.json({ success: true, status: 'Fetched all sensors.', data })
  })
})

apiRouter.post('/newsensor', (req, res) => {
  if (req.body.name) {
    const newSensor = new db.Sensor({
      name: req.body.name,
      description: req.body.description || '',
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
  } else {
    res.json({ success: false, status: 'Could not create new sensor, wrong input.' })
  }
})

apiRouter.post('/updatesensor', (req, res) => {
  // TODO: The post should contains the current data, new and old.
  // Should be safe to just update everything from body.
})

// TODO: Logic needed for triggering alarms and such.
apiRouter.post('/newsensorvalue', (req, res) => {
  if (req.body.sensorId && req.body.value) {
    // Check if the sensorId correlates with a Sensor
    db.Sensor.findOne({ _id: req.body.sensorId }, (err) => {
      if (!err) {
        const newSensorValue = db.SensorValue({
          sensorId: req.body.sensorId,
          value: req.body.value,
          time: new Date()
        })
        newSensorValue.save(() => res.json({ success: true, status: 'Sensor value saved' }))
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
    db.Sensor.find({ sensorId: req.body.sensorId }, (err, data) => {
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
