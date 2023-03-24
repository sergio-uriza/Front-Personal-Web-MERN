import { SERVER_URL, SERVER_URL_API } from '../../const'

export const SERVER_ROUTES = {
  BASE_PATH: SERVER_URL,
  BASE_API: SERVER_URL_API,
  ENDPOINTS: {
    AUTH: {
      REGISTER_USER: '/auth/register',
      LOGIN_USER: '/auth/login',
      LOGIN_ADMIN: '/auth/login_admin',
      REFRESH_TOKEN: '/auth/refresh'
    },
    USER: {
      CRUD: '/user',
      MY: {
        CRUD: '/user/my'
      }
    },
    MENU: {
      CRUD: '/menu'
    },
    COURSE: {
      CRUD: '/course'
    },
    BLOG: {
      CRUD: '/blog',
      MY: {
        CRUD: '/blog/my'
      }
    },
    NEWSLETTER: {
      CRUD: '/newsletter'
    }
  }
}
