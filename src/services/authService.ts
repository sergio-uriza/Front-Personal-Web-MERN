import { axiosConfig } from './config/axios.config'
import { constServerAPI } from './config/constants.config'
import { LoginUserAuthType } from './types/auth'
import { MessageResponseType } from './types/generic'

export const registerUserAuth = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<MessageResponseType> => {
  const body = { firstname, lastname, email, password }
  const res = await axiosConfig.post(constServerAPI.AUTH_ROUTES.REGISTER_USER, body)
  if (res.status !== 201 || res.data === undefined) throw new Error('Something has gone wrong')
  return res.data
}

export const loginUserAuth = async (
  email: string,
  password: string
): Promise<LoginUserAuthType> => {
  const body = { email, password }
  const res = await axiosConfig.post(constServerAPI.AUTH_ROUTES.LOGIN_USER, body)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong')
  return res.data
}
