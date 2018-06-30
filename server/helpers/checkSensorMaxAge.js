import db from '../schema'
import sensorsPubSub from './sensorsPubSub'

const checkSensormaxAge = () => {
  // Starts a timer that runs the below stuff every minute
  setInterval(() => {
    db.Sensor.find({ maxAgeAlarm: true }, (err, sensors) => {
      if (sensors) {
        sensors.map(sensor => {
          if (sensor.maxAgeMinutes !== null) {
            if (!sensor.maxAgeAlarmActive) {
              const millisDiff = Math.abs(new Date() - new Date(sensor.lastReportedTime))
              const minutes = Math.floor((millisDiff / 1000) / 60)
              if (minutes > sensor.maxAgeMinutes) {
                console.log(`setting maxage alarm active for ${sensor.name} -> ${minutes} > ${sensor.maxAgeMinutes}`)
                sensor.update({ maxAgeAlarmActive: true }, () => {
                  sensorsPubSub()
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
