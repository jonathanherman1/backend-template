import { app, server } from './index'
import { createServer } from 'http'
import * as config from './config'

jest.mock('express', () => () => ({
  use: jest.fn(),
  listen: jest.fn(),
}))

jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn((_, callback) => callback()),
  })),
}))

jest.mock('./config', () => ({
  connectDatabase: jest.fn(),
  setupEnv: jest.fn(),
  setupMiddleware: jest.fn(),
  setupProcessHandlers: jest.fn(),
  setupRoutes: jest.fn(),
}))

describe('Server Initialization', () => {
  it('sets up the environment', () => {
    expect(config.setupEnv).toHaveBeenCalled()
  })

  it('connects to the database', () => {
    expect(config.connectDatabase).toHaveBeenCalled()
  })

  it('sets up middleware', () => {
    expect(config.setupMiddleware).toHaveBeenCalledWith(app)
  })

  it('sets up routes', () => {
    expect(config.setupRoutes).toHaveBeenCalledWith(app, 'v1')
  })

  it('creates the HTTP server', () => {
    expect(createServer).toHaveBeenCalledWith(app)
  })

  it('starts the server on the correct port', () => {
    const port = Number(process.env.PORT)
    expect(server.listen).toHaveBeenCalledWith(port, expect.any(Function))
  })

  it('sets up process handlers', () => {
    expect(config.setupProcessHandlers).toHaveBeenCalledWith(server)
  })
})
