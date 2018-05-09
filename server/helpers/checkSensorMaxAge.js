import db from '../schema'
import sendWebSocketMessage from './sendWebSocketMessage'

const checkSensormaxAge = () => {
  // Starts a timer that runs the below stuff every minute
  setInterval(() => {
    db.Sensor.find({ maxAgeAlarm: true }, (err, sensors) => {
      if (sensors) {
        sensors.map(sensor => {
          console.log(`running maxAge check on sensor ${sensor.name}`)
          if (sensor.maxAgeMinutes !== null) {
            if (!sensor.maxAgeAlarmActive) {
              const millisDiff = Math.abs(new Date() - new Date(sensor.lastReportedTime))
              const minutes = Math.floor((millisDiff / 1000) / 60)
              if (minutes > sensor.maxAgeMinutes) {
                console.log(`sensor ${sensor.name} maxAge alarm!`)
                sensor.update({ maxAgeAlarmActive: true }, () => {
                  sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'maxAge' })
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