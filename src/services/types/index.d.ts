import { UserType } from '../../types'

// GENERIC MESSAGE RESPONSE TYPE
export type MessageResponseType = {
  message: string
}

// AUTH SERVICE TYPES
export type LoginUserAuthType = {
  accessToken: string
  refreshToken: string
}

export type RefreshAccTokenAuthType = {
  accessToken: string
}

// USER SERVICE TYPES
export type GetMeUserType = Omit<UserType, 'active'>
