import { getAllowedOrigins } from './constants'

describe('getAllowedOrigins', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('throws an error if NODE_ENV is not set', () => {
    expect(() => getAllowedOrigins(undefined)).toThrow('NODE_ENV is not set')
  })

  it('throws an error if NODE_ENV is invalid', () => {
    expect(() => getAllowedOrigins('invalid')).toThrow(
      'Invalid NODE_ENV! Valid options include: "development", "device", "production", or "test"',
    )
  })

  it('returns CLIENT_URL if NODE_ENV is not device', () => {
    process.env.CLIENT_URL = 'http://localhost:3000'
    const origins = getAllowedOrigins('development')
    expect(origins).toEqual(['http://localhost:3000'])
  })

  it('returns multiple CLIENT_URLs if NODE_ENV is device', () => {
    process.env.CLIENT_URL = 'http://localhost:3000'
    process.env.CLIENT_URL2 = 'http://localhost:3001'
    process.env.CLIENT_URL3 = 'http://localhost:3002'
    process.env.CLIENT_URL4 = 'http://localhost:3003'
    const origins = getAllowedOrigins('device')
    expect(origins).toEqual([
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ])
  })

  it('filters out undefined CLIENT_URLs in device mode', () => {
    process.env.CLIENT_URL = 'http://localhost:3000'
    process.env.CLIENT_URL2 = undefined
    process.env.CLIENT_URL3 = 'http://localhost:3002'
    process.env.CLIENT_URL4 = undefined
    const origins = getAllowedOrigins('device')
    expect(origins).toEqual(['http://localhost:3000', 'http://localhost:3002'])
  })
})
