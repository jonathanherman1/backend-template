import { Server } from 'http'
import { gracefulShutdown } from './shutdown'

/**
 * Sets up process event handlers for graceful shutdown.
 * 
 * @param server - The HTTP server instance to close when shutting down.
 */
export const setupProcessHandlers = (server: Server) => {
  process.on('SIGTERM', () => gracefulShutdown(server))
  process.on('SIGINT', () => gracefulShutdown(server))
}
