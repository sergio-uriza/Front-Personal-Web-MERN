import jwt_decode from 'jwt-decode'

type PayloadTokenType = {
  type?: string
  userId?: string
  iat?: number
  exp?: number
}

export const isValidToken = (token: string): number | false => {
  try {
    const { type, userId, exp } = jwt_decode<PayloadTokenType>(token)
    if (type == null || userId == null || exp == null) {
      return false
    }

    return exp
  } catch (_err) {
    return false
  }
}

export const isExpiredToken = (expToken: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000)

  if (expToken <= currentTime) return true
  return false
}
