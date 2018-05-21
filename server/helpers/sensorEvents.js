import db from '../schema'
import checkSensorAlarmTrigger from './checkSensorAlarmTrigger'
import sendWebSocketMessage from './sendWebSocketMessage'
// import settings from '../../client/src/settings.json'
import telldus from 'telldus'
// if (!settings.dev) {
//   const telldus = require('telldus')
// }

const minUpdateIntervalMinutes = 30;

const sensorEvents = () => {
  telldus.addSensorEventListener((
    deviceId,
    protocol,
    model,
    type,
    value
  ) => {
    const now = new Date()
    db.Sensor.find({}, (err, sensors) => {
      if (!err) {
        sensors.map(sensor => {
          if (sensor.identificationId === deviceId) {
            // Make sure were not updating if its less than minUpdateIntervalMinutes
            const millisDiff = Math.abs(now - new Date(sensor.lastReportedTime))
            const minutes = Math.floor((millisDiff / 1000) / 60)
            if (minutes > minUpdateIntervalMinutes) {
              const updated = { lastReportedValue: value, lastReportedTime: now }
              checkSensorAlarmTrigger(sensor, value)
              sendWebSocketMessage({ type: 'UPDATE_SENSOR_VALUE', sensorId: sensor._id, ...updated })
              sensor.update(updated, () => {
                const newSensorValue = new db.SensorValue({
                  sensorId: sensor._id,
                  value,
                  time: now,
                })
                newSensorValue.save(err => {
                  if (err) {
                    console.log(err)
                  }
                  console.log(`added new sensorvalue for ${sensor.name} : ${value}`)
                })
              })
            }
          }
        })
      }
    })
  })
}

export default sensorEvents
