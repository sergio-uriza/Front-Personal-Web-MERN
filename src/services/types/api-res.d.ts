import { UserRole } from '../enums/userRole.enum'

// API GLOBAL TYPES
export type UserTypeAPI = {
  _id: string
  firstname: string
  lastname: string
  email: string
  role: UserRole
  active: boolean
  updatedAt: Date
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

export type BlogTypeAPI = {
  _id: string
  title: string
  content: string
  path: string
  user?: {
    firstname: string
    lastname: string
  } | null
  createdAt: Date
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
export type GetMyUserType = Omit<UserTypeAPI, 'updatedAt' | 'active'>
export type GetMultipleUserType = UserTypeAPI[]

// MENU SERVICE TYPES
export type GetMultipleMenuType = MenuTypeAPI[]

// COURSE SERVICE TYPES
export type GetMultipleCourseType = {
  docs: CourseTypeAPI[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

// BLOG SERVICE TYPES
export type GetByPathBlogType = BlogTypeAPI
export type GetMyBlogType = Omit<BlogTypeAPI, 'user'>
export type GetMyMultipleBlogType = {
  docs: GetMyBlogType[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}
export type GetMultipleBlogType = {
  docs: BlogTypeAPI[]
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
