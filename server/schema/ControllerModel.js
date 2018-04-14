import mongoose from 'mongoose'

const controller = mongoose.Schema({
  name: { type: String, default: 'Unnamed controller' },
  description: { type: String, default: '' },
  external: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  lastReportedTime: { type: Date, default: null }
})

export default mongoose.model('Controller', controller);
