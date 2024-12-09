import request from 'supertest'
import { disconnectDatabase } from '../config'
import { app, server } from '../index'
import { Post } from '../models/Post'

describe('Posts Controller', () => {
  beforeAll(async () => {
    await Post.deleteMany({})
  })

  afterEach(async () => {
    await Post.deleteMany({})
    server.close()
  })

  afterAll(async () => {
    await Post.deleteMany({})
    await disconnectDatabase()
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve()
      })
    })
  })

  it('creates a new post', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({ name: 'Jon', message: 'Hello' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // Correct content
    expect(res.body.name).toBe('Jon')
    expect(res.body.message).toBe('Hello')
  })

  it('gets all posts', async () => {
    await new Post({ name: 'Jon', message: 'Hello' }).save()

    const res = await request(app)
      .get('/api/v1/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe('Jon')
    expect(res.body[0].message).toBe('Hello')
  })
})
