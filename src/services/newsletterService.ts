import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/constants.config'
import { GetMultipleNewsletterType, MessageResponseType } from './types/api-res'

export const getMultipleNewsletter = async (
  accessToken: string | null,
  limit = 10,
  page = 1,
  order = 1
): Promise<GetMultipleNewsletterType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.NEWSLETTER.CRUD}/?limit=${String(limit)}&page=${String(page)}&order=${String(order)}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteNewsletter = async (
  accessToken: string | null,
  idNewsletter: string
): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.NEWSLETTER.CRUD}/${idNewsletter}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const suscribeNewsletter = async (
  email: string
): Promise<MessageResponseType> => {
  const body = { email }

  const res = await axiosConfig.post(`${SERVER_ROUTES.ENDPOINTS.NEWSLETTER.CRUD}`, body)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
