import { CreateBlogBodyType, UpdateBlogBodyType } from './types/app-req'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/routes.config'
import { GetByPathBlogType, GetMultipleBlogType, GetMyMultipleBlogType, MessageResponseType } from './types/api-res'
import { verifyAccessToken } from '../utils/verifyAccessToken'

export const getByPathBlog = async (
  path: string | undefined
): Promise<GetByPathBlogType> => {
  if (path == null) throw new Error('Request Error, you do not have credentials')

  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.BLOG.CRUD}/${path}`)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const getMyMultipleBlog = async (
  limit = 10,
  page = 1
): Promise<GetMyMultipleBlogType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.BLOG.MY.CRUD}/?limit=${String(limit)}&page=${String(page)}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const getMultipleBlog = async (
  limit = 10,
  page = 1
): Promise<GetMultipleBlogType> => {
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.BLOG.CRUD}/?limit=${String(limit)}&page=${String(page)}`)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const createBlog = async (
  blog: CreateBlogBodyType,
  miniature?: File
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const formData = new FormData()
  Object.keys(blog).forEach((key) => {
    formData.append(key, String(blog[key as keyof CreateBlogBodyType]))
  })
  if (miniature != null) formData.append('miniature', miniature)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.BLOG.CRUD, formData, config)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateMyBlog = async (
  idMyBlog: string,
  blog: UpdateBlogBodyType,
  miniature?: File
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const formData = new FormData()
  Object.keys(blog).forEach((key) => {
    if (blog[key as keyof UpdateBlogBodyType] != null && blog[key as keyof UpdateBlogBodyType] !== '') {
      formData.append(key, String(blog[key as keyof UpdateBlogBodyType]))
    }
  })
  if (miniature != null) formData.append('miniature', miniature)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.BLOG.MY.CRUD}/${idMyBlog}`, formData, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateBlog = async (
  idBlog: string,
  blog: UpdateBlogBodyType,
  miniature?: File
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const formData = new FormData()
  Object.keys(blog).forEach((key) => {
    if (blog[key as keyof UpdateBlogBodyType] != null && blog[key as keyof UpdateBlogBodyType] !== '') {
      formData.append(key, String(blog[key as keyof UpdateBlogBodyType]))
    }
  })
  if (miniature != null) formData.append('miniature', miniature)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.BLOG.CRUD}/${idBlog}`, formData, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteMyBlog = async (
  idMyBlog: string
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.BLOG.MY.CRUD}/${idMyBlog}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteBlog = async (
  idBlog: string
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.BLOG.CRUD}/${idBlog}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
