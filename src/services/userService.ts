import { CreateUserBodyType, UpdateUserBodyType } from '../types'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/constants.config'
import { GetMeUserType, GetMultipleUserType, MessageResponseType } from './types'

export const getMeUser = async (accessToken: string): Promise<GetMeUserType> => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(SERVER_ROUTES.ENDPOINTS.USER.GET_ME, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const getMultipleUser = async (accessToken: string | null, active: boolean): Promise<GetMultipleUserType[]> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.USER.GET_MULTIPLE_USER}/?active=${String(active)}`, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const createUser = async (accessToken: string | null, user: CreateUserBodyType, avatar?: File): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const formData = new FormData()
  Object.keys(user).forEach((key) => {
    formData.append(key, String(user[key as keyof CreateUserBodyType]))
  })
  if (avatar != null) formData.append('avatar', avatar)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.USER.CREATE_USER, formData, config)
  if (res.status !== 201 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const updateUser = async (accessToken: string | null, idUser: string, user: UpdateUserBodyType, avatar?: File): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const formData = new FormData()
  Object.keys(user).forEach((key) => {
    if (user[key as keyof CreateUserBodyType] != null && user[key as keyof CreateUserBodyType] !== '') {
      formData.append(key, String(user[key as keyof CreateUserBodyType]))
    }
  })
  if (avatar != null) formData.append('avatar', avatar)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.USER.UPDATE_USER}/${idUser}`, formData, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const deleteUser = async (accessToken: string | null, idUser: string): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.USER.DELETE_USER}/${idUser}`, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}
