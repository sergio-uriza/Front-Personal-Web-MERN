import { createContext, useCallback, useState } from 'react'
import { refreshAccTokenAuth } from '../services/authService'
import { GetMyUserType } from '../services/types/api-res'
import { getMyUser } from '../services/userService'
import { clearTokensLocalStorage, setAccTokenLocalStorage } from '../utils/localStorage'

export type AuthContextType = {
  accessToken: string | null
  loggedUser: GetMyUserType | null
  loginAuthHandler: (accToken: string) => Promise<void>
  logoutAuthHandler: () => void
  reloginAuthHandler: (refToken: string) => Promise<void>
  updateLoggedUserAuth: (newLoggedUser: GetMyUserType) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type PropsType = {
  children: React.ReactNode
}

export function AuthContextProvider ({ children }: PropsType): JSX.Element {
  const [loggedUser, setloggedUser] = useState<GetMyUserType | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const loginAuthHandler = useCallback(async (accToken: string): Promise<void> => {
    const user = await getMyUser(accToken)
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
    const user = await getMyUser(res.accessToken)
    setloggedUser(user)
    setAccessToken(res.accessToken)
    setAccTokenLocalStorage(res.accessToken)
  }, [])

  const updateLoggedUserAuth = useCallback((newLoggedUser: GetMyUserType): void => {
    setloggedUser((prev) => (prev != null
      ? {
          ...prev,
          firstname: newLoggedUser.firstname,
          lastname: newLoggedUser.lastname,
          avatar: newLoggedUser.avatar
        }
      : newLoggedUser
    ))
  }, [])

  const value: AuthContextType = {
    accessToken,
    loggedUser,
    loginAuthHandler,
    logoutAuthHandler,
    reloginAuthHandler,
    updateLoggedUserAuth
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}
