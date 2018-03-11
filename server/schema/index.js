const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/homehub')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to db!'))

const sensor = mongoose.Schema({
  name: { type: String, default: 'Unnamed sensor' },
  description: { type: String, default: '' },
  lastReportedValue: { type: Number, default: null },
  lastReportedTime: { type: Date, default: null },
  maxAge: { type: Number, default: null },
  maxAgeAlarm: { type: Boolean, default: false },
  maxAgeAlarmActive: { type: Boolean, default: false },
  maxAgeAlarmManualReset: { type: Boolean, default: false },
  maxValueAlarm: { type: Boolean, default: false },
  maxValueAlarmActive: { type: Boolean, default: false },
  maxValue: { type: Number, default: null },
  minValueAlarm: { type: Boolean, default: false },
  minValueAlarmActive: { type: Boolean, default: false },
  minValue: { type: Number, default: null }
})

const sensorValue = mongoose.Schema({
  sensorId: { type: String, default: null },
  value: { type: Number, default: null },
  time: { type: Date, default: null },
})

const Sensor = db.model('Sensor', sensor)
const SensorValue = db.model('Sensorvalue', sensorValue)

module.exports = {
  Sensor,
  SensorValue
}
