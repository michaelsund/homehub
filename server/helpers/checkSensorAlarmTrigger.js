import db from '../schema'
import sendWebSocketMessage from './sendWebSocketMessage'

const checkSensorAlarmTrigger = (sensor, currentValue) => {
  if (sensor.maxValueAlarm) {
    if (currentValue > sensor.maxValue && !sensor.maxValueAlarmActive) {
      db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
        sensor.update({ maxValueAlarmActive: true }, () => {
          sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'maxValue' })
        })
      })
    }
  }
  if (sensor.minValueAlarm) {
    if (currentValue < sensor.minValue && !sensor.minValueAlarmActive) {
      db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
        sensor.update({ minValueAlarmActive: true }, () => {
          sendWebSocketMessage({ type: 'SENSOR_ALARM_ACTIVE', sensorId: sensor._id, alarmType: 'minValue' })
        })
      })
    }
  }
}

export default checkSensorAlarmTrigger
