import { useEffect, useState } from 'react'
import { UserTypeAPI } from '../services/types/api-res'
import { getMultipleUser } from '../services/userService'

type UseGetMultipleUserType = {
  usersList: UserTypeAPI[] | null
}

export const useGetMultipleUser = (
  isUserActive: boolean,
  newGet?: boolean
): UseGetMultipleUserType => {
  const [usersList, setUsersList] = useState<UserTypeAPI[] | null>(null)

  useEffect(() => {
    setUsersList(null)
    getMultipleUser(isUserActive)
      .then((res) => {
        setUsersList(res)
      })
      .catch((_err) => {
        setUsersList([])
      })
  }, [isUserActive, newGet])

  return {
    usersList
  }
}
