import { isString } from "../utils/typeGuards"

export type NodeEnv = 'development' | 'device' | 'production' | 'test'

const isNodeEnv = (value: string | undefined): value is NodeEnv => {
  if (!value) {
    throw new Error('NODE_ENV is not set')
  }

  return ['development', 'device', 'production', 'test'].includes(value)
}

export const getAllowedOrigins = (nodeEnv: string | undefined) => {
  if (!isNodeEnv(nodeEnv)) {
    throw new Error(
      'Invalid NODE_ENV! Valid options include: "development", "device", "production", or "test"',
    )
  }

  // This allows the backend to serve requests from the frontend
  // when it's running in device mode (aka lan mode)
  if (nodeEnv === 'device') {
    return [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL2,
      process.env.CLIENT_URL3,
      process.env.CLIENT_URL4,
    ].filter((url) => isString(url))
  }
  return [process.env.CLIENT_URL].filter((url) => isString(url))
}
