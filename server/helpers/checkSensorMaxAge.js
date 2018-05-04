import db from '../schema'
import sendWebSocketMessage from './sendWebSocketMessage'

const checkSensorMaxAge = () => {
  console.log('starting maxAge check of sensors every 1 minute.')
  // Starts a timer that runs the below stuff every minute
  setInterval(() => {
    console.log('running sensor maxAge check')
    db.Sensor.find({ maxAgeAlarm: true }, (err, sensors) => {
      sensors.map(sensor => {
        if (sensor.maxAge !== null) {
          console.log(`checking maxAge for sensor ${sensor.name} maxAge: ${sensor.maxAge} maxAgeAlarm: ${sensor.maxAgeAlarm}`)
          if (!sensor.maxAgeAlarmActive) {
            const millisDiff = Math.abs(new Date() - new Date(sensor.lastReportedTime))
            const minutes = Math.floor((millisDiff / 1000) / 60)
            if (minutes > sensor.maxAge) {
              console.log(`setting maxAgeAlarm active for ${sensor.name}`)
              sensor.update({ maxAgeAlarmActive: true }, () => {
                sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'maxAge' })
              })
            }
          }
        }
        return null
      })
    })
  }, 60000)
  // Get all sensors from db where maxAgeAlarm is set
}

export default checkSensorMaxAge
