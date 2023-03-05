import { UserRole } from '../enums/userRole.enum'

export type UserType = {
  _id: string
  firstname: string
  lastname: string
  email: string
  role: UserRole
  active: boolean
  avatar?: string
}
