import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, required: true, enum: ['info', 'warning', 'critical'] },
  body: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Alert', alertSchema)
