import mongoose from 'mongoose'

const sensorValue = mongoose.Schema({
  sensorId: { type: String, default: null },
  value: { type: Number, default: null },
  time: { type: Date, default: null },
})

const SensorValue = mongoose.model('Sensorvalue', sensorValue)

export default SensorValue
