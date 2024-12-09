import express from 'express'
import request from 'supertest'
import { setupRoutes } from '../config'
import * as postController from '../controllers/posts'

jest.mock('../controllers/posts', () => ({
  getPosts: jest.fn((_, res) => {
    res.status(200).send([]); // Mock sending an empty array
  }),
  createPost: jest.fn((req, res) => {
    res.status(201).send({ id: 1, ...req.body }); // Mock creating a post
  }),
  updatePost: jest.fn((req, res) => {
    res.status(200).send({ id: req.params.id, ...req.body }); // Mock updating a post
  }),
  deletePost: jest.fn((_, res) => {
    res.status(200).send({ message: 'Deleted successfully' }); // Mock deleting a post
  }),
}));

describe('Post Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    setupRoutes(app, 'v1') // Use the same setup logic as your app
    jest.clearAllMocks()
  })

  it('should call the correct function for GET /posts', async () => {
    await request(app).get('/api/v1/posts')
    expect(postController.getPosts).toHaveBeenCalledTimes(1)
  })

  it('should call the correct function for POST /posts', async () => {
    const newPost = { name: 'Jon', message: 'Hello' }
    await request(app).post('/api/v1/posts').send(newPost)
    expect(postController.createPost).toHaveBeenCalledTimes(1)
  })
})
