import { CreateUserBodyType, UpdateMyUserBodyType, UpdateUserBodyType } from './types/app-req'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/routes.config'
import { GetMyUserType, GetMultipleUserType, MessageResponseType } from './types/api-res'
import { verifyAccessToken } from '../utils/verifyAccessToken'

export const getMyUser = async (
  accessToken: string
): Promise<GetMyUserType> => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(SERVER_ROUTES.ENDPOINTS.USER.MY.CRUD, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateMyUser = async (
  myUser: UpdateMyUserBodyType,
  avatar?: File
): Promise<GetMyUserType> => {
  const accessToken = await verifyAccessToken()

  const formData = new FormData()
  Object.keys(myUser).forEach((key) => {
    if (myUser[key as keyof UpdateMyUserBodyType] != null && myUser[key as keyof UpdateMyUserBodyType] !== '') {
      formData.append(key, String(myUser[key as keyof UpdateMyUserBodyType]))
    }
  })
  if (avatar != null) formData.append('avatar', avatar)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(SERVER_ROUTES.ENDPOINTS.USER.MY.CRUD, formData, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const getMultipleUser = async (
  active: boolean
): Promise<GetMultipleUserType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.USER.CRUD}/?active=${String(active)}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const createUser = async (
  user: CreateUserBodyType,
  avatar?: File
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const formData = new FormData()
  Object.keys(user).forEach((key) => {
    formData.append(key, String(user[key as keyof CreateUserBodyType]))
  })
  if (avatar != null) formData.append('avatar', avatar)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.USER.CRUD, formData, config)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateUser = async (
  idUser: string,
  user: UpdateUserBodyType,
  avatar?: File
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

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
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.USER.CRUD}/${idUser}`, formData, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteUser = async (
  idUser: string
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.USER.CRUD}/${idUser}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
