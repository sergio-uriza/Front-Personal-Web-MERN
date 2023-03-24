import { createContext, useCallback, useState } from 'react'
import { refreshAccTokenAuth } from '../services/authService'
import { GetMyUserType } from '../services/types/api-res'
import { getMyUser } from '../services/userService'
import { clearTokensLocalStorage, setAccTokenLocalStorage } from '../utils/localStorage'

export type AuthContextType = {
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

  const loginAuthHandler = useCallback(async (accToken: string): Promise<void> => {
    const user = await getMyUser(accToken)
    setloggedUser(user)
  }, [])

  const logoutAuthHandler = useCallback((): void => {
    clearTokensLocalStorage()
    setloggedUser(null)
  }, [])

  const reloginAuthHandler = useCallback(async (refToken: string): Promise<void> => {
    const { accessToken } = await refreshAccTokenAuth(refToken)
    const recoveredUser = await getMyUser(accessToken)
    setloggedUser(recoveredUser)
    setAccTokenLocalStorage(accessToken)
  }, [])

  const updateLoggedUserAuth = useCallback((newLoggedUser: GetMyUserType): void => {
    setloggedUser(newLoggedUser)
  }, [])

  const value: AuthContextType = {
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
