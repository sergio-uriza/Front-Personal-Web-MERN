import { UserRole } from '../enums/userRole.enum'

// API GLOBAL TYPES
export type UserTypeAPI = {
  _id: string
  firstname: string
  lastname: string
  email: string
  role: UserRole
  active: boolean
  avatar?: string
}

export type MenuTypeAPI = {
  _id: string
  title: string
  path: string
  order: number
  active: boolean
}

export type CourseTypeAPI = {
  _id: string
  title: string
  description: string
  url: string
  price: number
  score: number
  miniature?: string
}

export type NewsletterTypeAPI = {
  _id: string
  email: string
}

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
export type GetMeUserType = Omit<UserTypeAPI, 'active'>
export type GetMultipleUserType = UserTypeAPI

// MENU SERVICE TYPES
export type GetMultipleMenuType = MenuTypeAPI

// COURSE SERVICE TYPES
export type GetMultipleCourseType = {
  docs: CourseTypeAPI[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

// NEWSLETTER SERVICE TYPES
export type GetMultipleNewsletterType = {
  docs: NewsletterTypeAPI[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}
