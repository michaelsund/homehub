import db from '../schema'
import sensorsPubSub from './sensorsPubSub'
import Send from './emitPushbulletMessage'

// Local array keeping tabs on triggertimes, for sensors that
// sometimes trigger a false positive.
const triggerCountThreshold = 10
const sensorsTriggerTimes = []

const checkSensorAlarmTrigger = (sensor, currentValue) => {
  if (sensor.maxValueAlarm) {
    if (currentValue > sensor.maxValue && !sensor.maxValueAlarmActive) {
      if (!sensorsTriggerTimes.find(s => s._id === sensor._id)) {
        sensorsTriggerTimes.push({ _id: sensor._id, triggerTimes: 1 })
      } else {
        sensorsTriggerTimes.map(s => {
          if (s._id === sensor._id) {
            s.triggerTimes += 1;
            if (s.triggerTimes >= triggerCountThreshold) {
              // Reset triggertimes and set sensor to alarm.
              s.triggerTimes = 0
              db.Sensor.findOne({ _id: sensor._id }, (err, sensor) => {
                sensor.update({ maxValueAlarmActive: true }, () => {
                  sensorsPubSub()
                  // Avoid spamming, just send if there is no alarm active.
                  if (!sensor.maxValueAlarmActive) {
                    Send(sensor.name, `exceeded max value: ${sensor.maxValue} with ${currentValue}`)
                  }
                })
              })
            }
          }
        })
      }
    } else {
      sensorsTriggerTimes.map(s => {
        // Reset triggercount
        if (s._id === sensor._id) {
          s.triggerTimes = 0
        }
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
