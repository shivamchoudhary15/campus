import express from 'express'
import Alert from '../models/Alert.js'

const router = express.Router()

// GET /api/alerts - list active alerts (public or optional auth)
router.get('/', async (req, res) => {
  try {
    const list = await Alert.find({ active: true }).sort({ createdAt: -1 }).limit(50)
    const alerts = list.map((a) => ({
      id: a._id,
      title: a.title,
      severity: a.severity,
      body: a.body,
      time: formatTimeAgo(a.createdAt),
    }))
    res.json({ alerts })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

export default router
