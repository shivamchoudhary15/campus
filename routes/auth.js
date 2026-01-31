import express from 'express'
import User from '../models/User.js'
import { signToken } from '../middleware/auth.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() })
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    const user = await User.create({
      email: email.trim().toLowerCase(),
      password: password.trim(),
      name: (name || email.split('@')[0]).trim(),
    })
    const token = signToken({ userId: user._id })
    res.status(201).json({
      user: { id: user._id, email: user.email, name: user.name, emergencyInfo: user.emergencyInfo, primaryContactId: user.primaryContactId },
      token,
    })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password')
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    user.password = undefined
    const token = signToken({ userId: user._id })
    res.json({
      user: { id: user._id, email: user.email, name: user.name, emergencyInfo: user.emergencyInfo, primaryContactId: user.primaryContactId },
      token,
    })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' })
  }
})

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      emergencyInfo: req.user.emergencyInfo,
      primaryContactId: req.user.primaryContactId,
    },
  })
})

export default router
