import express from 'express'
import { check, validationResult } from 'express-validator/check'
import db from '../schema'
import config from '../settings.json'
import helpers from '../helpers'
// const { matchedData, sanitize } = require('express-validator/filter');

const apiRouter = express.Router()

if (config.telldusDuoConnected) {
  // eslint-disable-next-line
  const telldus = require('telldus')
  // TODO: Will not be own routes, but will be included from sensors and controllers db calls.
  // Its rather the eventListeners that will not work and not push telldus information
  apiRouter.get('/telldustest', (req, res) => {
    telldus.getDevices((err, devices) => {
      if (err) {
        console.log(`Error: ${err}`)
      } else {
        console.log(devices)
      }
    })
    res.json({ success: true })
  })
} else {
  console.log('no tellstick duo connected, ignoring routes')
}

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
      maxAgeMinutes: req.body.maxAge || null,
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

apiRouter.post(
  '/acksensoralarm',
  [
    check('sensorId').exists().isLength({ min: 1 }).trim(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ success: false, errors: errors.mapped() });
    } else {
      // Default acks all active alarms on sensor.
      db.Sensor.findByIdAndUpdate(req.body.sensorId, {
        $set: {
          maxAgeAlarmActive: false,
          maxValueAlarmActive: false,
          minValueAlarmActive: false
        }
      }, { new: false }, err => {
        if (err) {
          res.json({ success: false, status: 'Can not ack sensor' })
        } else {
          res.json({ success: true, status: 'Sensor alarms acked' })
          helpers.sendWebSocketMessage({ type: 'SENSOR_ALARM_ACK', sensorId: req.body.sensorId })
        }
      })
    }
  }
)

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
            const updated = { lastReportedValue: req.body.value, lastReportedTime: new Date() }
            sensor.update(updated, () => {
              // Update websocket client with the new value
              helpers.sendWebSocketMessage({ type: 'UPDATE_SENSOR_VALUE', sensorId: req.body.sensorId, ...updated })
              helpers.checkSensorAlarmTrigger(sensor, req.body.value)
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
    db.SensorValue.find({ sensorId: req.query.sensorId }).sort('-time').exec((err, data) => {
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
    db.SensorValue.find({ sensorId: req.body.sensorId }).sort('-time').exec((err, data) => {
      if (err) {
        console.log(err)
      }
      res.json({ success: true, status: 'Values for sensor', data })
    })
  } else {
    res.json({ success: false, status: 'Incorrect data supplied.' })
  }
})

export default apiRouter
