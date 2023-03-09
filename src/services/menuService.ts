import { CreateMenuBodyType, UpdateMenuBodyType } from '../types'
import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/constants.config'
import { GetMultipleMenuType, MessageResponseType } from './types'

export const getMultipleMenu = async (active: boolean): Promise<GetMultipleMenuType[]> => {
  const res = await axiosConfig.get(`${SERVER_ROUTES.ENDPOINTS.MENU.GET_MULTIPLE_MENU}/?active=${String(active)}`)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const createMenu = async (accessToken: string | null, menu: CreateMenuBodyType): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.MENU.CREATE_MENU, menu, config)
  if (res.status !== 201 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const updateMenu = async (accessToken: string | null, idMenu: string, menu: UpdateMenuBodyType): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.patch(`${SERVER_ROUTES.ENDPOINTS.MENU.UPDATE_MENU}/${idMenu}`, menu, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}

export const deleteMenu = async (accessToken: string | null, idMenu: string): Promise<MessageResponseType> => {
  if (accessToken == null) throw new Error('Request Error, you do not have credentials')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.delete(`${SERVER_ROUTES.ENDPOINTS.MENU.DELETE_MENU}/${idMenu}`, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}
