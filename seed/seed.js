import 'dotenv/config'
import mongoose from 'mongoose'
import Alert from '../models/Alert.js'
import Incident from '../models/Incident.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-safety'

const alerts = [
  { title: 'Campus-wide safety drill', severity: 'info', body: 'Scheduled drill today 4–5 PM. No action required.', active: true },
  { title: 'Library entrance closed', severity: 'warning', body: 'East entrance under maintenance. Use main entrance.', active: true },
  { title: 'Weather advisory', severity: 'warning', body: 'Heavy rain expected tonight. Avoid low-lying paths.', active: true },
]

const incidents = [
  { type: 'suspicious_activity', location: 'Block B parking', status: 'resolved', detail: 'Security attended. Area clear.' },
  { type: 'light_outage', location: 'Path near cafeteria', status: 'ongoing', detail: 'Repair crew en route.' },
  { type: 'medical', location: 'Hostel A', status: 'resolved', detail: 'Student assisted. All clear.' },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    await Alert.deleteMany({})
    await Incident.deleteMany({})
    await Alert.insertMany(alerts)
    await Incident.insertMany(incidents)
    console.log('Seed done: alerts and incidents created.')
  } catch (err) {
    console.error('Seed failed:', err)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
