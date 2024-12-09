import type { Application } from "express"
import * as routes from '../routes'
import { isValidAPIVersion } from "../utils/typeGuards"

/**
 * Sets up all the routes in the application.
 * 
 * @param app - The Express application instance.
 */
export const setupRoutes = (app: Application, apiVersion: string | undefined) => {
  isValidAPIVersion(apiVersion)

  const baseRoute = `/api/${(apiVersion)}`
  Object.entries(routes).forEach(([routeName, route]) => {
    app.use(`${baseRoute}/${routeName}`, route)
  })
}
