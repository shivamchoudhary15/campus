import mongoose from 'mongoose'

const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ['ongoing', 'resolved'] },
  detail: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('Incident', incidentSchema)
