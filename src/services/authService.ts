import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/routes.config'
import { LoginUserAuthType, MessageResponseType, RefreshAccTokenAuthType } from './types/api-res'

export const registerUserAuth = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<MessageResponseType> => {
  const body = { firstname, lastname, email, password }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.AUTH.REGISTER_USER, body)
  if (res.status !== 201 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const loginUserAuth = async (
  email: string,
  password: string
): Promise<LoginUserAuthType> => {
  const body = { email, password }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.AUTH.LOGIN_USER, body)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const loginAdminAuth = async (
  email: string,
  password: string
): Promise<LoginUserAuthType> => {
  const body = { email, password }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.AUTH.LOGIN_ADMIN, body)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}

export const refreshAccTokenAuth = async (
  refToken: string
): Promise<RefreshAccTokenAuthType> => {
  const body = { refreshToken: refToken }
  const res = await axiosConfig.post(SERVER_ROUTES.ENDPOINTS.AUTH.REFRESH_TOKEN, body)
  if (res.status !== 200 || res.data === undefined) {
    throw new Error('Something has gone wrong, please try again later')
  }
  return res.data
}
