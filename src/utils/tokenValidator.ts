import jwt_decode from 'jwt-decode'

type PayloadTokenType = {
  type?: string
  userId?: string
  iat?: number
  exp?: number
}

export const isValidToken = (token: string): boolean => {
  try {
    const { exp } = jwt_decode<PayloadTokenType>(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (exp == null || exp <= currentTime) return false

    return true
  } catch (_err) {
    return false
  }
}
