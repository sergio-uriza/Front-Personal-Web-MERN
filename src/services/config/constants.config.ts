const SERVER_IP = 'localhost:3977'

export const constServerAPI = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api`,
  AUTH_ROUTES: {
    REGISTER_USER: '/auth/register',
    LOGIN_USER: 'auth/login'
  }
}
