import dotenv from 'dotenv-flow'
import dotenvSafe from 'dotenv-safe'

/** Sets up environment variables.
 * 
 * Loads environment variables from the .env.* files and validates that all required variables are set.
 * Loads these based on the current environment (development, test, production) set by NODE_ENV in the package scripts.
 */
export const setupEnv = () => {
  if (!process.env.GITHUB_ACTIONS && process.env.NODE_ENV !== 'production') {
    dotenv.config()
    // Validate required environment variables
    dotenvSafe.config({
      example: './.env.example',
    })
  }
}
