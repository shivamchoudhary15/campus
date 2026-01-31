import express from 'express'
import Incident from '../models/Incident.js'

const router = express.Router()

// GET /api/incidents - list recent incidents (live updates)
router.get('/', async (req, res) => {
  try {
    const list = await Incident.find().sort({ createdAt: -1 }).limit(20)
    const incidents = list.map((i) => ({
      id: i._id,
      type: i.type,
      location: i.location,
      status: i.status,
      detail: i.detail,
      time: formatTimeAgo(i.createdAt),
    }))
    res.json({ incidents })
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
