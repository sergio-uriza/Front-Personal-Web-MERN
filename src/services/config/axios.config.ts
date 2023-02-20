import axios from 'axios'
import { constServerAPI } from './constants.config'

export const axiosConfig = axios.create(
  {
    baseURL: constServerAPI.BASE_API,
    responseType: 'json',
    timeout: 5000,
    validateStatus: function (status) { return status >= 200 && status < 300 }
  }
)
