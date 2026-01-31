import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const emergencyInfoSchema = new mongoose.Schema({
  userName: { type: String, default: '' },
  emergencyContactName: { type: String, default: '' },
  emergencyContactPhone: { type: String, default: '' },
}, { _id: false })

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, select: false },
  name: { type: String, default: '', trim: true },
  emergencyInfo: { type: emergencyInfoSchema, default: () => ({}) },
  primaryContactId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrustedContact', default: null },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)
