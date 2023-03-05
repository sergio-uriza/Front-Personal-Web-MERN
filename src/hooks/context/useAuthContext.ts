import { useContext } from 'react'
import { AuthContext, AuthContextType } from '../../contexts/AuthContextProvider'

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error(
      'useAuthContext has to be used within <AuthContext.Provider>'
    )
  }

  return context
}
