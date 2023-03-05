import { createContext, useCallback, useState } from 'react'
import { refreshAccTokenAuth } from '../services/authService'
import { GetMeUserType } from '../services/types'
import { getMeUser } from '../services/userService'
import { clearTokensLocalStorage, setAccTokenLocalStorage } from '../utils/localStorage'

export type AuthContextType = {
  accessToken: string | null
  loggedUser: GetMeUserType | null
  loginAuthHandler: (accToken: string) => Promise<void>
  logoutAuthHandler: () => void
  reloginAuthHandler: (refToken: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type PropsType = {
  children: React.ReactNode
}

export function AuthContextProvider ({ children }: PropsType): JSX.Element {
  const [loggedUser, setloggedUser] = useState<GetMeUserType | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const loginAuthHandler = useCallback(async (accToken: string): Promise<void> => {
    const user = await getMeUser(accToken)
    setloggedUser(user)
    setAccessToken(accToken)
  }, [])

  const logoutAuthHandler = useCallback((): void => {
    clearTokensLocalStorage()
    setloggedUser(null)
    setAccessToken(null)
  }, [])

  const reloginAuthHandler = useCallback(async (refToken: string): Promise<void> => {
    const res = await refreshAccTokenAuth(refToken)
    const user = await getMeUser(res.accessToken)
    setloggedUser(user)
    setAccessToken(res.accessToken)
    setAccTokenLocalStorage(res.accessToken)
  }, [])

  const value: AuthContextType = {
    accessToken,
    loggedUser,
    loginAuthHandler,
    logoutAuthHandler,
    reloginAuthHandler
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}
