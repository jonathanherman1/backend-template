export const isString = (value: string | undefined): value is string => {
  return typeof value === 'string'
}

export type APIVersion = 'v1' | 'v2'

export const isValidAPIVersion = (value: string | undefined): value is APIVersion => {
  if (!value || !isString(value)) {
    throw new Error('API_VERSION is not set')
  }

  if (!['v1', 'v2'].includes(value)) {
    throw new Error('Invalid API_VERSION! Valid options include: "v1" or "v2"')
  }

  return ['v1', 'v2'].includes(value)
}
