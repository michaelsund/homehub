import SensorModel from '../schema/SensorModel'

const ackSensorAlarms = sensorId => new Promise(resolve => {
  SensorModel.findOneAndUpdate(
    { _id: sensorId },
    {
      $set: {
        maxAgeAlarmActive: false,
        maxValueAlarmActive: false,
        minValueAlarmActive: false
      }
    },
    { new: true }, ((err, sensor) => {
      resolve(sensor)
    })
  )
})

export default ackSensorAlarms
