import db from '../schema'
import sendWebSocketMessage from './sendWebSocketMessage'

const checkSensormaxAge = () => {
  // Starts a timer that runs the below stuff every minute
  setInterval(() => {
    db.Sensor.find({ maxAgeMinutesAlarm: true }, (err, sensors) => {
      if (sensors) {
        sensors.map(sensor => {
          if (sensor.maxAgeMinutes !== null) {
            if (!sensor.maxAgeMinutesAlarmActive) {
              const millisDiff = Math.abs(new Date() - new Date(sensor.lastReportedTime))
              const minutes = Math.floor((millisDiff / 1000) / 60)
              if (minutes > sensor.maxAgeMinutes) {
                sensor.update({ maxAgeMinutesAlarmActive: true }, () => {
                  sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'maxAgeMinutes' })
                })
              }
            }
          }
          return null
        })
      }
    })
  }, 60000)
}

export default checkSensormaxAge
