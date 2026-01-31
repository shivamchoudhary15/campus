import mongoose from 'mongoose'
console.log("ENV:", process.env.MONGODB_URI)

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.error("MongoDB connection error:", err.message)
    process.exit(1)
  }
}
