import mongoose from 'mongoose'

const sensorValue = mongoose.Schema({
  sensorId: { type: String, default: null },
  value: { type: Number, default: null },
  time: { type: Date, default: null },
})

export default mongoose.model('SensorValue', sensorValue);
