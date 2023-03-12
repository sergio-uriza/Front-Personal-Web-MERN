import { useEffect, useState } from 'react'
import { UserTypeAPI } from '../services/types'
import { getMultipleUser } from '../services/userService'
import { useAuthContext } from './context/useAuthContext'

type UseGetMultipleUserType = {
  usersList: UserTypeAPI[] | null
}

export const useGetMultipleUser = (isUserActive: boolean, newGet?: boolean): UseGetMultipleUserType => {
  const [usersList, setUsersList] = useState<UserTypeAPI[] | null>(null)
  const { accessToken } = useAuthContext()

  useEffect(() => {
    setUsersList(null)
    getMultipleUser(accessToken, isUserActive)
      .then((res) => {
        setUsersList(res)
      })
      .catch((_err) => {
        setUsersList([])
      })
  }, [accessToken, isUserActive, newGet])

  return {
    usersList
  }
}
