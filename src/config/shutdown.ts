import { disconnectDatabase } from "./database"
import type { Server } from 'http'

/**
 * Gracefully shuts down the server by closing the database connection and then the server itself.
 * 
 * @param server - The HTTP server instance to close.
 */
export const gracefulShutdown = async (server: Server) => {
  console.log('\nShutting down gracefully...\n')
  await disconnectDatabase()

  server.close((err) => {
    if (err) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error during server close:', err)
        process.exit(1)
      } else {
        throw new Error(`Error during server close: ${err}`);
      }
    } else {
      console.log('Closed out remaining connections')
      process.exit(0)
    }
  })
}
