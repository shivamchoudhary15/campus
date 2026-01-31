import express from 'express'
import Report from '../models/Report.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

// POST /api/reports
router.post('/', async (req, res) => {
  try {
    const { type, location, description } = req.body
    if (!type?.trim()) {
      return res.status(400).json({ error: 'Report type is required' })
    }
    if (!description?.trim()) {
      return res.status(400).json({ error: 'Description is required' })
    }
    const report = await Report.create({
      user: req.user._id,
      type: type.trim(),
      location: (location || '').trim(),
      description: description.trim(),
    })
    res.status(201).json({
      report: { id: report._id, type: report.type, location: report.location, description: report.description, createdAt: report.createdAt },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/reports - user's own reports (optional)
router.get('/', async (req, res) => {
  try {
    const list = await Report.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50)
    res.json({ reports: list })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
