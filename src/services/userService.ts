import { axiosConfig } from './config/axios.config'
import { SERVER_ROUTES } from './config/constants.config'
import { GetMeUserType } from './types'

export const getMeUser = async (accessToken: string): Promise<GetMeUserType> => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const res = await axiosConfig.get(SERVER_ROUTES.ENDPOINTS.USER.GET_ME, config)
  if (res.status !== 200 || res.data === undefined) throw new Error('Something has gone wrong, please try again later')
  return res.data
}
