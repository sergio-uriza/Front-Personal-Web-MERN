import { useEffect, useState } from 'react'
import { getAccTokenLocalStorage, getRefTokenLocalStorage } from '../utils/localStorage'
import { isValidToken } from '../utils/tokenValidator'
import { useAuthContext } from './context/useAuthContext'

type UseRecoverLoginType = {
  isRecovering: boolean
}

export const useRecoverLogin = (): UseRecoverLoginType => {
  const [isRecovering, setIsRecovering] = useState<boolean>(true)
  const { loginAuthHandler, logoutAuthHandler, reloginAuthHandler } = useAuthContext()

  useEffect(() => {
    const accToken = getAccTokenLocalStorage()
    const refToken = getRefTokenLocalStorage()

    if (accToken == null || refToken == null) {
      logoutAuthHandler()
      setIsRecovering(false)
      return
    }

    if (isValidToken(accToken)) {
      loginAuthHandler(accToken)
        .then(() => {
          setIsRecovering(false)
        })
        .catch(() => {
          logoutAuthHandler()
          setIsRecovering(false)
        })
    } else {
      if (isValidToken(refToken)) {
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
