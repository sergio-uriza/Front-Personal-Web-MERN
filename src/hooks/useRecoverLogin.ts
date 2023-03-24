import { useEffect, useState } from 'react'
import { getAccTokenLocalStorage, getRefTokenLocalStorage } from '../utils/localStorage'
import { isExpiredToken, isValidToken } from '../utils/tokenValidator'
import { useAuthContext } from './context/useAuthContext'

type UseRecoverLoginType = {
  isRecovering: boolean
}

export const useRecoverLogin = (): UseRecoverLoginType => {
  const [isRecovering, setIsRecovering] = useState<boolean>(true)
  const {
    loginAuthHandler,
    logoutAuthHandler,
    reloginAuthHandler
  } = useAuthContext()

  useEffect(() => {
    const accToken = getAccTokenLocalStorage()
    const refToken = getRefTokenLocalStorage()

    let expAccToken: number | false = false
    if (accToken != null) expAccToken = isValidToken(accToken)

    let expRefToken: number | false = false
    if (refToken != null) expRefToken = isValidToken(refToken)

    if (
      accToken == null ||
      refToken == null ||
      expAccToken === false ||
      expRefToken === false
    ) {
      logoutAuthHandler()
      setIsRecovering(false)
      return
    }

    if (!isExpiredToken(expAccToken)) {
      loginAuthHandler(accToken)
        .then(() => {
          setIsRecovering(false)
        })
        .catch(() => {
          logoutAuthHandler()
          setIsRecovering(false)
        })
    } else {
      if (!isExpiredToken(expRefToken)) {
        reloginAuthHandler(refToken)
          .then(() => {
            setIsRecovering(false)
          })
          .catch(() => {
            logoutAuthHandler()
            setIsRecovering(false)
          })
      } else {
        logoutAuthHandler()
        setIsRecovering(false)
      }
    }
  }, [loginAuthHandler, logoutAuthHandler, reloginAuthHandler])

  return {
    isRecovering
  }
}
