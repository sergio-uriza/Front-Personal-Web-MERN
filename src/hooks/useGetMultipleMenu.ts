import { useEffect, useState } from 'react'
import { getMultipleMenu } from '../services/menuService'
import { GetMultipleMenuType } from '../services/types'

type UseGetMultipleUserType = {
  listMenus: GetMultipleMenuType[] | null
}

export const useGetMultipleMenu = (isMenuActive: boolean, newGet: boolean): UseGetMultipleUserType => {
  const [listMenus, setListMenus] = useState<GetMultipleMenuType[] | null>(null)

  useEffect(() => {
    setListMenus(null)
    getMultipleMenu(isMenuActive)
      .then((res) => {
        setListMenus(res)
      })
      .catch((_err) => {
        setListMenus([])
      })
  }, [isMenuActive, newGet])

  return {
    listMenus
  }
}
