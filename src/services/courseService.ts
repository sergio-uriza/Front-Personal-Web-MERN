import { CreateCourseBodyType, UpdateCourseBodyType } from './types/app-req'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/constants.config'
import { GetMultipleCourseType, MessageResponseType } from './types/api-res'

export const getMultipleCourse = async (
  limit = 10,
  page = 1
): Promise<GetMultipleCourseType> => {
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.COURSE.CRUD}/?limit=${String(limit)}&page=${String(page)}`)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const createCourse = async (
  accessToken: string | null,
  course: CreateCourseBodyType,
  miniature?: File
): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const formData = new FormData()
  Object.keys(course).forEach((key) => {
    formData.append(key, String(course[key as keyof CreateCourseBodyType]))
  })
  if (miniature != null) formData.append('miniature', miniature)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.COURSE.CRUD, formData, config)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateCourse = async (
  accessToken: string | null,
  idCourse: string,
  course: UpdateCourseBodyType,
  miniature?: File
): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const formData = new FormData()
  Object.keys(course).forEach((key) => {
    if (course[key as keyof UpdateCourseBodyType] != null && course[key as keyof UpdateCourseBodyType] !== '') {
      formData.append(key, String(course[key as keyof UpdateCourseBodyType]))
    }
  })
  if (miniature != null) formData.append('miniature', miniature)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.COURSE.CRUD}/${idCourse}`, formData, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteCourse = async (
  accessToken: string | null,
  idCourse: string
): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.COURSE.CRUD}/${idCourse}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
