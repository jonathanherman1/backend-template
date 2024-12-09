import mongoose from 'mongoose'
import { Post, postZodSchema } from './Post'
import { connectDatabase, disconnectDatabase } from '../config'

describe('Post Zod Schema', () => {
  it('validates a correct post', () => {
    const validPost = {
      message: 'Hello World',
      name: 'user123',
    }
    expect(() => postZodSchema.parse(validPost)).not.toThrow()
  })

  it('invalidates a post without a message', () => {
    const invalidPost = {
      name: 'user123',
    }
    expect(() => postZodSchema.parse(invalidPost)).toThrow()
  })

  it('invalidates a post without a name', () => {
    const invalidPost = {
      message: 'Hello World',
    }
    expect(() => postZodSchema.parse(invalidPost)).toThrow()
  })
})

describe('Post Mongoose Model', () => {
  beforeEach(async () => {
    await connectDatabase()
  })

  afterEach(async () => {
    await Post.deleteMany({})
    await disconnectDatabase()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('creates a post successfully', async () => {
    const post = new Post({
      message: 'Hello World',
      name: 'user123',
    })
    const savedPost = await post.save()
    expect(savedPost._id).toBeDefined()
    expect(savedPost.message).toBe('Hello World')
    expect(savedPost.name).toBe('user123')
  })

  it('fails to create a post without a message', async () => {
    const post = new Post({
      name: 'user123',
    })
    await expect(post.save()).rejects.toThrow()
  })

  it('fails to create a post without a name', async () => {
    const post = new Post({
      message: 'Hello World',
    })
    await expect(post.save()).rejects.toThrow()
  })
})