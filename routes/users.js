import express from 'express'
import User from '../models/User.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

// GET /api/users/me - full profile
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('primaryContactId')
    res.json({ user: { id: user._id, email: user.email, name: user.name, emergencyInfo: user.emergencyInfo, primaryContactId: user.primaryContactId } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/users/me - update profile (emergency info, primary contact)
router.patch('/me', async (req, res) => {
  try {
    const { emergencyInfo, primaryContactId } = req.body
    const update = {}
    if (emergencyInfo != null) update.emergencyInfo = emergencyInfo
    if (primaryContactId !== undefined) update.primaryContactId = primaryContactId || null
    const user = await User.findByIdAndUpdate(req.user._id, { $set: update }, { new: true })
    res.json({ user: { id: user._id, email: user.email, name: user.name, emergencyInfo: user.emergencyInfo, primaryContactId: user.primaryContactId } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
