import mongoose from 'mongoose'

const controller = mongoose.Schema({
  name: {
    type: String,
    default: 'Unnamed controller',
    unique: true,
    required: true
  },
  description: { type: String, default: '' },
  external: { type: Boolean, default: false },
  identificationId: { type: Number, default: null },
  status: { type: Boolean, default: false },
  lastReportedTime: { type: Date, default: null },
  timer: { type: Boolean, default: false },
  onTime: { type: String, default: '' },
  offTime: { type: String, default: '' }
})

export default mongoose.model('Controller', controller);
