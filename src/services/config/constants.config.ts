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
      CRUD: '/user',
      ME: '/user/me'
    },
    MENU: {
      CRUD: '/menu'
    },
    COURSE: {
      CRUD: '/course'
    },
    BLOG: {
      CRUD: '/blog'
    },
    NEWSLETTER: {
      CRUD: '/newsletter'
    }
  }
}
