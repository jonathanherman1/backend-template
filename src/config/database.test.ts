import mongoose from 'mongoose'
import { connectDatabase, disconnectDatabase } from './database'

describe('Database Connection', () => {
  beforeEach(async () => {
    await connectDatabase()
  })

  afterEach(async () => {
    await disconnectDatabase()
  })

  it('connects to MongoDB', async () => {
    expect(mongoose.connection.readyState).toBe(1) // 1 means connected
  })

  it('disconnects from MongoDB', async () => {
    await disconnectDatabase()
    expect(mongoose.connection.readyState).toBe(0) // 0 means disconnected
  })

  it('handles invalid connection string', async () => {
    const originalUri = process.env.MONGODB_URI
    process.env.MONGODB_URI = 'invalid_connection_string'

    try {
      await connectDatabase()
    } catch (err) {
      expect(err).toBeDefined()
    } finally {
      process.env.MONGODB_URI = originalUri
    }
  })

  it('handles undefined connection string', async () => {
    const originalUri = process.env.MONGODB_URI
    process.env.MONGODB_URI = undefined

    try {
      await connectDatabase()
    } catch (err) {
      expect(err).toBeDefined()
    } finally {
      process.env.MONGODB_URI = originalUri
    }
  })
})
