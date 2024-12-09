import mongoose from 'mongoose'

export const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('Mongo_URI environment variable is missing')
  }
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error(`MongoDB connection error: ${err}`)
      process.exit(1);
    } else {
      throw new Error(`MongoDB connection error: ${err}`);
    }
  }
}

export const disconnectDatabase = async () => {
  await mongoose.disconnect()
}
