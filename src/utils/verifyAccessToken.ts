import { refreshAccTokenAuth } from '../services/authService'
import { getAccTokenLocalStorage, getRefTokenLocalStorage, setAccTokenLocalStorage } from './localStorage'
import { isValidToken, isExpiredToken } from './tokenValidator'

export const verifyAccessToken = async (): Promise<string> => {
  const accToken = getAccTokenLocalStorage()
  let expAccToken: number | false = false
  if (accToken != null) expAccToken = isValidToken(accToken)

  if (accToken == null || expAccToken === false) {
    setTimeout((): void => { window.location.reload() }, 4000)
    throw new Error('You do not have credentials')
  }

  if (isExpiredToken(expAccToken)) {
    const refToken = getRefTokenLocalStorage()
    let expRefToken: number | false = false
    if (refToken != null) expRefToken = isValidToken(refToken)

    if (refToken == null || expRefToken === false) {
      setTimeout((): void => { window.location.reload() }, 4000)
      throw new Error('You do not have credentials')
    }

    if (isExpiredToken(expRefToken)) {
      setTimeout((): void => { window.location.reload() }, 6000)
      throw new Error('Your session time has expired')
    }

    const { accessToken } = await refreshAccTokenAuth(refToken)
    setAccTokenLocalStorage(accessToken)
    return accessToken
  } else {
    return accToken
  }
}
