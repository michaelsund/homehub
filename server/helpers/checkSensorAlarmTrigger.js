import db from '../schema'
import sensorsPubSub from './sensorsPubSub'
import Send from './emitPushbulletMessage'

const checkSensorAlarmTrigger = (sensor, currentValue) => {
  if (sensor.maxValueAlarm) {
    if (currentValue > sensor.maxValue && !sensor.maxValueAlarmActive) {
      db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
        sensor.update({ maxValueAlarmActive: true }, () => {
          sensorsPubSub()
          // Avoid spamming, just send if there is no alarm active.
          //Send(sensor.name, `exceeded max value: ${sensor.maxValue} with ${currentValue}`)
        })
      })
    }
  }
  if (sensor.minValueAlarm) {
    if (currentValue < sensor.minValue && !sensor.minValueAlarmActive) {
      db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
        sensor.update({ minValueAlarmActive: true }, () => {
          sensorsPubSub()
        })
      })
    }
  }
}

export default checkSensorAlarmTrigger
