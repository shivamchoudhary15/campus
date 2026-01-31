import express from 'express'
import TrustedContact from '../models/TrustedContact.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

// GET /api/contacts/trusted
router.get('/trusted', async (req, res) => {
  try {
    const list = await TrustedContact.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ contacts: list.map((c) => ({ id: c._id, name: c.name, phone: c.phone })) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/contacts/trusted
router.post('/trusted', async (req, res) => {
  try {
    const { name, phone } = req.body
    if (!name?.trim() || !phone?.trim()) {
      return res.status(400).json({ error: 'Name and phone are required' })
    }
    const contact = await TrustedContact.create({
      user: req.user._id,
      name: name.trim(),
      phone: phone.trim(),
    })
    res.status(201).json({ contact: { id: contact._id, name: contact.name, phone: contact.phone } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/contacts/trusted/:id - optional, e.g. update name/phone
router.patch('/trusted/:id', async (req, res) => {
  try {
    const contact = await TrustedContact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    )
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    res.json({ contact: { id: contact._id, name: contact.name, phone: contact.phone } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/contacts/trusted/:id
router.delete('/trusted/:id', async (req, res) => {
  try {
    const contact = await TrustedContact.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
