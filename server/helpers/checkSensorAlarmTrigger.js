import db from '../schema'
import sensorsPubSub from './sensorsPubSub'

const checkSensorAlarmTrigger = (sensor, currentValue) => {
  if (sensor.maxValueAlarm) {
    if (currentValue > sensor.maxValue && !sensor.maxValueAlarmActive) {
      db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
        sensor.update({ maxValueAlarmActive: true }, () => {
          sensorsPubSub()
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
