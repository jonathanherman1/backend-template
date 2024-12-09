import compression from 'compression'
import cors from 'cors'
import express, { type Application } from 'express'
import helmet from 'helmet'
import { getAllowedOrigins } from './constants'

/**
 * Sets up the middleware for the Express application.
 * Configures JSON parsing, security headers, compression, and CORS settings.
 * 
 * @param app - The Express application instance.
 */
export const setupMiddleware = (app: Application) => {
  app.use(express.json())
  app.use(helmet())
  app.use(compression())

  const allowedOrigins = getAllowedOrigins(process.env.NODE_ENV)

  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }))
}
