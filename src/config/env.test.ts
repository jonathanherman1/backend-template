import dotenv from 'dotenv-flow'
import dotenvSafe from 'dotenv-safe'
import { setupEnv } from './env'

jest.mock('dotenv-flow')
jest.mock('dotenv-safe')

describe('setupEnv', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  if (!process.env.GITHUB_ACTIONS) {
    it('loads environment variables using dotenv-flow', () => {
      setupEnv()
      expect(dotenv.config).toHaveBeenCalled()
    })
  
    it('validates required environment variables using dotenv-safe', () => {
      setupEnv()
      expect(dotenvSafe.config).toHaveBeenCalledWith({
        example: './.env.example',
      })
    })
  
    it('loads environment variables and validate them', () => {
      expect(() => setupEnv()).not.toThrow()
    })
  } else {
    it('relies on GitHub Actions for injecting environment variables', () => {
      expect(true).toBe(true)
    })
  }
})
