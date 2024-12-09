import { isString, isValidAPIVersion } from './typeGuards'

describe('isString', () => {
  it('returns true for a string value', () => {
    expect(isString('hello')).toBe(true)
  })

  it('returns false for an undefined value', () => {
    expect(isString(undefined)).toBe(false)
  })

  it('returns false for a number value', () => {
    expect(isString(123 as any)).toBe(false)
  })

  it('returns false for a boolean value', () => {
    expect(isString(true as any)).toBe(false)
  })

  it('returns false for an object value', () => {
    expect(isString({} as any)).toBe(false)
  })

  it('returns false for an array value', () => {
    expect(isString([] as any)).toBe(false)
  })
})

describe('isValidAPIVersion', () => {
  it('returns true for a valid API version "v1"', () => {
    expect(isValidAPIVersion('v1')).toBe(true)
  })

  it('returns true for a valid API version "v2"', () => {
    expect(isValidAPIVersion('v2')).toBe(true)
  })

  it('throws an error for an undefined value', () => {
    expect(() => isValidAPIVersion(undefined)).toThrow('API_VERSION is not set')
  })

  it('throws an error for an invalid API version', () => {
    expect(() => isValidAPIVersion('v3')).toThrow('Invalid API_VERSION! Valid options include: "v1" or "v2"')
  })

  it('throws an error for a non-string value', () => {
    expect(() => isValidAPIVersion(123 as any)).toThrow('API_VERSION is not set')
  })
})
