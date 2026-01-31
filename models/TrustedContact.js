import mongoose from 'mongoose'

const trustedContactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
}, { timestamps: true })

trustedContactSchema.index({ user: 1 })

export default mongoose.model('TrustedContact', trustedContactSchema)
