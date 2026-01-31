import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import contactsRoutes from './routes/contacts.js'
import reportsRoutes from './routes/reports.js'
import alertsRoutes from './routes/alerts.js'
import incidentsRoutes from './routes/incidents.js'

await connectDB()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/reports', reportsRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/incidents', incidentsRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Campus Safety API running" })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
