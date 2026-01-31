import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['suspicious', 'hazard', 'lighting', 'medical', 'other'] },
  location: { type: String, default: '' },
  description: { type: String, required: true },
}, { timestamps: true })

reportSchema.index({ user: 1, createdAt: -1 })

export default mongoose.model('Report', reportSchema)
