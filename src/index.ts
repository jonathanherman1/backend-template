import express from 'express'
import { createServer } from 'http'
import {
  connectDatabase,
  setupEnv,
  setupMiddleware,
  setupProcessHandlers,
  setupRoutes,
} from './config'

// Exporting to use in tests
export const app = express()
export let server: ReturnType<typeof createServer>

const startServer = async () => {
  setupEnv()
  await connectDatabase()

  const apiVersion = process.env.API_VERSION

  setupMiddleware(app)
  setupRoutes(app, apiVersion)

  // Normally, express internally creates the http server
  // but we need access to it directly to pass to socket.io
  server = createServer(app)

  const port: number = parseInt(process.env.PORT || '', 10) || 3000
  server.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Server is running on http://localhost:${port}`)
    }
  })

  setupProcessHandlers(server)
}

startServer()
  .then(() => {
    console.log('Server started successfully')
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    if (process.env.NODE_ENV === 'production') {
      console.error('Failed to start server:', err);
      process.exit(1);
    } else {
      throw new Error(`Failed to start server: ${err}`);
    }
  })
