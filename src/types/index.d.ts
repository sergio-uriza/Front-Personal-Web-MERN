import { UserTypeAPI, MenuTypeAPI } from '../services/types'

export type CreateUserBodyType = Omit<UserTypeAPI, '_id' | 'active' | 'avatar'> & { password: string }
export type UpdateUserBodyType = Partial<Omit<UserTypeAPI, '_id' | 'avatar'>> & { password?: string }

export type CreateMenuBodyType = Omit<MenuTypeAPI, '_id'>
export type UpdateMenuBodyType = Partial<Omit<MenuTypeAPI, '_id'>>
