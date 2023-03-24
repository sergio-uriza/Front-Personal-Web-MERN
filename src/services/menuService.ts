import { CreateMenuBodyType, UpdateMenuBodyType } from './types/app-req'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/routes.config'
import { GetMultipleMenuType, MessageResponseType } from './types/api-res'
import { verifyAccessToken } from '../utils/verifyAccessToken'

export const getMultipleMenu = async (
  active: boolean
): Promise<GetMultipleMenuType> => {
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.MENU.CRUD}/?active=${String(active)}`)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const createMenu = async (
  menu: CreateMenuBodyType
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.MENU.CRUD, menu, config)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const updateMenu = async (
  idMenu: string,
  menu: UpdateMenuBodyType
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.MENU.CRUD}/${idMenu}`, menu, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const deleteMenu = async (
  idMenu: string
): Promise<MessageResponseType> => {
  const accessToken = await verifyAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.MENU.CRUD}/${idMenu}`, config)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
