import { UserTypeAPI, MenuTypeAPI, CourseTypeAPI, BlogTypeAPI } from './api-res'

export type UpdateMyUserBodyType = Partial<Omit<UserTypeAPI, '_id' | 'email' | 'role' | 'updatedAt' | 'avatar'>> & { oldPassword?: string, newPassword?: string }
export type CreateUserBodyType = Omit<UserTypeAPI, '_id' | 'active' | 'updatedAt' | 'avatar'> & { password: string }
export type UpdateUserBodyType = Partial<Omit<UserTypeAPI, '_id' | 'updatedAt' | 'avatar'>> & { password?: string }

export type CreateMenuBodyType = Omit<MenuTypeAPI, '_id'>
export type UpdateMenuBodyType = Partial<Omit<MenuTypeAPI, '_id'>>

export type CreateCourseBodyType = Omit<CourseTypeAPI, '_id' | 'miniature'>
export type UpdateCourseBodyType = Partial<Omit<CourseTypeAPI, '_id' | 'miniature'>>

export type CreateBlogBodyType = Omit<BlogTypeAPI, '_id' | 'user' | 'createdAt' | 'miniature'>
export type UpdateBlogBodyType = Partial<Omit<BlogTypeAPI, '_id' | 'user' | 'createdAt' | 'miniature'>>
