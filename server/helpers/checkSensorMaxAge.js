import db from '../schema'
import sendWebSocketMessage from './sendWebSocketMessage'

const checkSensormaxAge = () => {
  console.log('starting maxAgeMinutes check of sensors every 1 minute.')
  // Starts a timer that runs the below stuff every minute
  setInterval(() => {
    console.log('running sensor maxAgeMinutes check')
    db.Sensor.find({ maxAgeMinutesAlarm: true }, (err, sensors) => {
      sensors.map(sensor => {
        if (sensor.maxAgeMinutes !== null) {
          console.log(`checking maxAgeMinutes for sensor ${sensor.name} maxAgeMinutes: ${sensor.maxAgeMinutes} maxAgeMinutesAlarm: ${sensor.maxAgeMinutesAlarm}`)
          if (!sensor.maxAgeMinutesAlarmActive) {
            const millisDiff = Math.abs(new Date() - new Date(sensor.lastReportedTime))
            const minutes = Math.floor((millisDiff / 1000) / 60)
            if (minutes > sensor.maxAgeMinutes) {
              console.log(`setting maxAgeMinutesAlarm active for ${sensor.name}`)
              sensor.update({ maxAgeMinutesAlarmActive: true }, () => {
                sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'maxAgeMinutes' })
              })
            }
          }
        }
        return null
      })
    })
  }, 60000)
  // Get all sensors from db where maxAgeMinutesAlarm is set
}

export default checkSensormaxAge
