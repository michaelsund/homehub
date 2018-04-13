import mongoose from 'mongoose'

const sensor = mongoose.Schema({
  name: { type: String, default: 'Unnamed sensor' },
  description: { type: String, default: '' },
  measurementType: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  measurementUnit: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  scaling: { type: Number, default: 0 },
  external: { type: Boolean, default: true },
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

const Sensor = mongoose.model('Sensor', sensor)

export default Sensor
