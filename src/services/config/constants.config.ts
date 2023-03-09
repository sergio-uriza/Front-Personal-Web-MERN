const SERVER_IP = 'localhost:3977'

export const SERVER_ROUTES = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api`,
  ENDPOINTS: {
    AUTH: {
      REGISTER_USER: '/auth/register',
      LOGIN_USER: '/auth/login',
      LOGIN_ADMIN: '/auth/login_admin',
      REFRESH_TOKEN: '/auth/refresh'
    },
    USER: {
      GET_ME: '/user/me',
      GET_MULTIPLE_USER: '/user',
      CREATE_USER: '/user',
      UPDATE_USER: '/user',
      DELETE_USER: '/user'
    },
    MENU: {
      GET_MULTIPLE_MENU: '/menu',
      CREATE_MENU: '/menu',
      UPDATE_MENU: '/menu',
      DELETE_MENU: '/menu'
    }
  }
}
