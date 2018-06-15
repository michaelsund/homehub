import mongoose from 'mongoose'

const server = mongoose.Schema({
  serverName: {
    type: String,
    default: 'Unnamed server',
    unique: true,
    required: true
  },
  serverType: { type: String, default: '' },
  serverIp: { type: String, default: '' },
  port: { type: Number, default: null },
  status: { type: Boolean, default: false },
  lastChecked: { type: Date, default: null }
})

export default mongoose.model('Server', server)
