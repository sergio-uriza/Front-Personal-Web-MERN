import axios from 'axios'
import { SERVER_ROUTES } from './constants.config'

export const axiosConfig = axios.create(
  {
    baseURL: SERVER_ROUTES.BASE_API,
    responseType: 'json',
    timeout: 5000,
    validateStatus: function (status) { return status >= 200 && status < 300 }
  }
)
