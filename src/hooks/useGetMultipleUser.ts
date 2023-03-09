import { useEffect, useState } from 'react'
import { GetMultipleUserType } from '../services/types'
import { getMultipleUser } from '../services/userService'
import { useAuthContext } from './context/useAuthContext'

type UseGetMultipleUserType = {
  listUsers: GetMultipleUserType[] | null
}

export const useGetMultipleUser = (isUserActive: boolean, newGet: boolean): UseGetMultipleUserType => {
  const [listUsers, setListUsers] = useState<GetMultipleUserType[] | null>(null)
  const { accessToken } = useAuthContext()

  useEffect(() => {
    setListUsers(null)
    getMultipleUser(accessToken, isUserActive)
      .then((res) => {
        setListUsers(res)
      })
      .catch((_err) => {
        setListUsers([])
      })
  }, [accessToken, isUserActive, newGet])

  return {
    listUsers
  }
}
